package com.a205.controller;

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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.a205.dto.Pagination;
import com.a205.dto.Post;
import com.a205.service.PostService;
import com.a205.service.VolService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/rest")
@CrossOrigin(origins = "*")
public class PostRestController {
	private static final Logger logger = LoggerFactory.getLogger(PostRestController.class);

	@Autowired
	PostService service;

	private ResponseEntity<Map<String, Object>> response(Object data, boolean status, HttpStatus hstatus) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("status", status);
		resultMap.put("data", data);
		return new ResponseEntity<>(resultMap, hstatus);
	}
	
//	@GetMapping("/Post")
//	@ApiOperation("전체 공지사항 정보를 반환한다.")
//	public ResponseEntity<Map<String, Object>> getAllMember() {
//		try {
//			List<Post> list = service.searchAll();
//			return response(list, true, HttpStatus.OK);
//		} catch (Exception e) {
//			logger.error("목록조회실패", e);
//			return response(e.getMessage(), false, HttpStatus.CONFLICT);
//		}
//	}

	@GetMapping("/Post/{no}")
	@ApiOperation("No에 해당하는 하나의 포스트 정보를 반환한다.")
	public ResponseEntity<Map<String, Object>> getMember(@PathVariable int no) {
		try {
			Post Post = service.selectOne(no);
			return response(Post, true, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("포스트조회실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}

	/*
	 * @RequestMapping(method = RequestMethod.GET, value = "/Post/Page")
	 * 
	 * @ApiOperation("공지사항 페이지를 반환한다.") public ResponseEntity<Map<String, Object>>
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
	 * logger.error("공지사항조회실패", e); return response(e.getMessage(), false,
	 * HttpStatus.CONFLICT); } }
	 */


	@PostMapping("/Post")
	@ApiOperation("전달받은 공지사항 정보를 등록한다.")
	public ResponseEntity<Map<String, Object>> insertMember(@RequestBody Post Post) {
		try {
			boolean result = service.add(Post);
			return response(result, true, HttpStatus.CREATED);
		} catch (RuntimeException e) {
			logger.error("공지사항 등록 실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}

	@PutMapping("/Post")
	@ApiOperation("전달받은 공지사항 정보를 업데이트한다.")
	public ResponseEntity<Map<String, Object>> updateMember(@RequestBody Post Post) {
		try {
			boolean result = service.update(Post);
			return response(result, true, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("공지사항 정보 수정 실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}

	@DeleteMapping("/Post/{no}")
	@ApiOperation("전달받은 공지사항 정보를 삭제한다.")
	public ResponseEntity<Map<String, Object>> deleteMember(@PathVariable int no, HttpSession session) {
		try {
			boolean result = service.remove(no);
			if (result == true) {
				session.invalidate();
			}
			return response(result, true, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("공지사항 삭제 실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}

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
