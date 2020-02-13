package com.a205.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.a205.dto.Member;
import com.a205.dto.Post;
import com.a205.dto.PostView;
import com.a205.dto.Post_vote;
import com.a205.service.FollowServive;
import com.a205.service.PostService;
import com.file.payload.FileUploadResponse;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/rest")
@CrossOrigin(origins = "*")
public class PostRestController {
	private static final Logger logger = LoggerFactory.getLogger(PostRestController.class);

	@Autowired
	PostService service;

	@Autowired
	FollowServive followService;

	@Autowired
	FileUploadComponents f_con;

	private ResponseEntity<Map<String, Object>> response(Object data, boolean status, HttpStatus hstatus) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("status", status);
		resultMap.put("data", data);
		return new ResponseEntity<>(resultMap, hstatus);
	}

	@PostMapping("/Post")
	@ApiOperation("전달받은 포스트 정보를 등록한다.")
	public ResponseEntity<Map<String, Object>> insertMember(@RequestPart Post post,
			@RequestPart(required = false) MultipartFile[] files) {
		try {
			Map<String, Object> resultMap = new HashMap<String, Object>();
			boolean result = service.add(post);
			// service.add(Post);
			List<FileUploadResponse> fileResponses = null;
			if (files != null) {
				int p_id = service.getid();
				// List<FileUploadResponse> fileResponse= uploadMultipleFiles(files, p_id);
				fileResponses = f_con.uploadMultipleFiles(files, p_id);
			}
			resultMap.put("result", result);
			resultMap.put("fileResponses", fileResponses);

			return response(resultMap, true, HttpStatus.CREATED);
			// return response(fileResponse, true, HttpStatus.CREATED);
		} catch (RuntimeException e) {
			logger.error("포스트 등록 실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}

	@PostMapping("/PostVote")
	@ApiOperation("전달받은 포스트 투표 정보를 등록한다.")
	public ResponseEntity<Map<String, Object>> insertPostVote(@RequestBody Post_vote post_vote) {
		try {
			boolean result = service.addPostVote(post_vote);
			// service.add(Post);
			return response(result, true, HttpStatus.CREATED);
			// return response(fileResponse, true, HttpStatus.CREATED);
		} catch (RuntimeException e) {
			logger.error("포스트 등록 실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}

	@DeleteMapping("/PostVote")
	@ApiOperation("전달받은 포스트 투표 정보를 삭제한다.")
	public ResponseEntity<Map<String, Object>> removePostVote(@RequestBody Post_vote post_vote) {
		try {
			boolean result = service.removePostVote(post_vote);
			// service.add(Post);
			return response(result, true, HttpStatus.CREATED);
			// return response(fileResponse, true, HttpStatus.CREATED);
		} catch (RuntimeException e) {
			logger.error("포스트 등록 실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}

	
	@GetMapping("/Post/{p_id}")
	@ApiOperation("p_id의 포스트 및 첨부파일 경로 리스트를 반환한다.")
	public ResponseEntity<Map<String, Object>> getPost(@PathVariable int p_id) {
		try {
			// Map<String, Object> resultMap = new HashMap<String, Object>();
////			List<PostView> feed = new ArrayList<>();
			PostView view = new PostView();

			Post post = service.selectOne(p_id);
			List<String> storedFileNames = f_con.getMultipleFiles(p_id);
//			resultMap.put("post", post);
//			resultMap.put("uris", storedFileNames);
//			return response(resultMap, true, HttpStatus.OK);
			view.setM_id(post.getM_id());
			view.setP_content(post.getP_content());
			view.setP_status(post.getP_status());
			view.setV_id(post.getV_id());
			// feed.add(ff);
			view.setFiles(storedFileNames);
////			feed.add(view);
			return response(view, true, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("포스트조회실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}

	@GetMapping("/PostFeed/{m_id}")
	@ApiOperation("m_id의 피드 리턴(팔로우하는사람들의 포스트 가져오기)")
	public ResponseEntity<Map<String, Object>> getPostFeed(@PathVariable int m_id) {
		try {
			List<PostView> feed = new ArrayList<>();
			List<Integer> list = service.searchFeed(m_id);
			for (int p_id : list) {
				// HashMap<String, Object> map = new HashMap<String, Object>();
				PostView view = new PostView();
				Post post = service.selectOne(p_id);
				List<String> storedFileNames = f_con.getMultipleFiles(p_id);
				view.setM_id(post.getM_id());
				view.setP_content(post.getP_content());
				view.setP_status(post.getP_status());
				view.setV_id(post.getV_id());
				// feed.add(ff);
				view.setFiles(storedFileNames);
				feed.add(view);
			}
			return response(feed, true, HttpStatus.OK);

		} catch (Exception e) {
			logger.error("포스트조회실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}

	@DeleteMapping("/Post/{p_id}")
	@ApiOperation("전달받은 포스트 정보를 삭제한다.")
	public ResponseEntity<Map<String, Object>> deleteMember(@PathVariable int p_id, HttpSession session) {
		try {
			boolean result = service.remove(p_id);
			if (result == true) {
				session.invalidate();
			}
			return response(result, true, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("포스트 삭제 실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}

//	@GetMapping("/Post")
//	@ApiOperation("전체 포스트 정보를 반환한다.")
//	public ResponseEntity<Map<String, Object>> getAllMember() {
//		try {
//			List<Post> list = service.searchAll();
//			return response(list, true, HttpStatus.OK);
//		} catch (Exception e) {
//			logger.error("목록조회실패", e);
//			return response(e.getMessage(), false, HttpStatus.CONFLICT);
//		}
//	}

	/*
	 * @RequestMapping(method = RequestMethod.GET, value = "/Post/Page")
	 * 
	 * @ApiOperation("포스트 페이지를 반환한다.") public ResponseEntity<Map<String, Object>>
	 * getFoodPage(@RequestParam Map<String,String> params) { try {
	 * 
	 * Integer page= Integer.parseInt(params.get("page")); Integer range=
	 * Integer.parseInt(params.get("range"));
	 * 
	 * Integer foodlistCnt = service.getTotalPostListCnt();
	 * 
	 * Pagination p = new Pagination();
	 * 
	 * p.pageInfo(page, range, foodlistCnt);
	 * 
	 * List<Post> foodres = service.getPostpage(p); HashMap<String,Object> res=new
	 * HashMap<>(); res.put("items", foodres); res.put("pagination", p);
	 * 
	 * return response(res, true, HttpStatus.OK); } catch (Exception e) {
	 * logger.error("포스트조회실패", e); return response(e.getMessage(), false,
	 * HttpStatus.CONFLICT); } }
	 */

	//// 업데이트는 일단 보류

//	@PutMapping("/Post")
//	@ApiOperation("전달받은 포스트 정보를 업데이트한다.")
//	public ResponseEntity<Map<String, Object>> updateMember(@RequestBody Post Post) {
//		try {
//			boolean result = service.update(Post);
//			return response(result, true, HttpStatus.OK);
//		} catch (Exception e) {
//			logger.error("포스트 정보 수정 실패", e);
//			return response(e.getMessage(), false, HttpStatus.CONFLICT);
//		}
//	}

//	@GetMapping("Post/search")
//	public ResponseEntity<Map<String, Object>> getPostListView(@RequestParam String condition,
//			@RequestParam String key) {
//		try {
//			System.out.printf("c %s  k %s \n", condition, key);
//			List<Post> Postlist = service.searchByCondition(condition, key);
//			System.out.println(Postlist);
//			return response(Postlist, true, HttpStatus.OK);
//		} catch (Exception e) {
//			logger.error("공지 검색  실패", e);
//			return response(e.getMessage(), false, HttpStatus.CONFLICT);
//			// TODO: handle exception
//		}
//
//		// System.out.println(service.searchAll());
//
//	}

}
