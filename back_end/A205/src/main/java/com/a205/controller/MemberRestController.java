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
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.a205.component.FileUploadComponents;
import com.a205.dto.Member;
import com.a205.dto.Member_detail;
import com.a205.dto.Post;
import com.a205.dto.PostView;
import com.a205.dto.Vol;
import com.a205.model.MemberPatchRequest;
import com.a205.service.MemberService;
import com.a205.service.PostService;
import com.file.payload.FileUploadResponse;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/rest")
public class MemberRestController {

	private static final Logger logger = LoggerFactory.getLogger(MemberRestController.class);

	@Autowired
	MemberService service;
	
	@Autowired
	PostService p_service;
	
	@Autowired
	FileUploadComponents f_con;

	private ResponseEntity<Map<String, Object>> response(Object data, boolean status, HttpStatus hStatus) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("status", status);
		resultMap.put("data", data);
		return new ResponseEntity<>(resultMap, hStatus);
	}

	@GetMapping("/Member")
	@ApiOperation("전체 회원정보를 반환한다.")
	public ResponseEntity<Map<String, Object>> getAllMember() {
		try {
			List<Member> list = service.searchAll();
			return response(list, true, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("목록조회실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}

	@SuppressWarnings("null")
	@GetMapping("/Member/{userId}")
	@ApiOperation("ID에 해당하는 하나의 회원정보를 반환한다. 프로필 사진도 가져오게 수정!")
	public ResponseEntity<Map<String, Object>> getMember(@PathVariable String userId) {
		try {
			Member member = service.search(userId);
// 현재 유저검색은 로그인 된 사람만 가능
			if (member != null) {
				//System.out.println(member.getM_userid());
				member.setProfile(f_con.getProfile(member.getM_id()));
				return response(member, true, HttpStatus.OK);
			} else {
				System.out.println(member.getM_userid());
				return response(null, true, HttpStatus.OK);
			}
		} catch (Exception e) {
			logger.error("회원조회실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}

	@GetMapping("/CheckId/{userId}")
	@ApiOperation("현재 DB에서 id가 존재하는지 체크 후 boolean 값으로 반환")
	public ResponseEntity<Map<String, Object>> checkId(@PathVariable String userId) {
		try {
			if (service.checkID(userId)) {
				return response(true, true, HttpStatus.OK);
			} else {
				return response(false, true, HttpStatus.OK);
			}
		} catch (Exception e) {
			logger.error("회원조회실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}

	@GetMapping("/CheckEmail/{email}")
	@ApiOperation("현재 DB에서 email이 존재하는지 체크 후 boolean 값으로 반환")
	public ResponseEntity<Map<String, Object>> checkEmail(@PathVariable String email) {
		try {
			if (service.checkEmail(email)) {
				return response(true, true, HttpStatus.OK);
			} else {
				return response(false, true, HttpStatus.OK);
			}
		} catch (Exception e) {
			logger.error("회원조회실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}

	@PutMapping("/Member/{userId}")
	@ApiOperation("전달받은 회원정보를 업데이트한다.")
	public ResponseEntity<Map<String, Object>> updateMember(@RequestBody Member member) {

		try {
			boolean result = service.update(member);
			return response(result, true, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("회원정보 수정 실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}

	@DeleteMapping("/Member/{id}")
	@ApiOperation("전달받은 회원정보를 삭제한다.")
	public ResponseEntity<Map<String, Object>> deleteMember(@PathVariable String id, HttpSession session) {
		try {
			boolean result = service.remove(id);
			if (result == true) {
				session.invalidate();
			}
			return response(result, true, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("회원 탈퇴 실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}

	@GetMapping("/Member/Post/{m_userId}/{no1}/{no2}")
	@ApiOperation("ID에 해당하는 유저가 생성한 글들을 불러온다.(내가 쓴 포스트)")
	public ResponseEntity<Map<String, Object>> getUserPost(@PathVariable String m_userId, @PathVariable int no1, @PathVariable int no2) {
		try {
//			List<Post> postList = service.searchPost(userId);
			List<PostView> feed = new ArrayList<>();
			List<Integer> plist = p_service.searchMyPosts(m_userId, no1, no2);
			for (int p_id : plist) {
				// HashMap<String, Object> map = new HashMap<String, Object>();
				PostView view = new PostView();
				Post post = p_service.selectOne(p_id);
				List<String> storedFileNames = f_con.getMultipleFiles(p_id);
				view.setP_id(post.getP_id());
				view.setM_id(post.getM_id());
				view.setP_content(post.getP_content());
				view.setP_status(post.getP_status());
				view.setV_id(post.getV_id());
				view.setFiles(storedFileNames);
				List<Integer> m_ids = p_service.countM_id(p_id);
				List<Member> post_vote_members = new ArrayList<Member>();
				for(Integer m_idd:m_ids) {
					Member member = service.selectByM_id(m_idd);
					post_vote_members.add(member);
					
				}
				view.setPost_vote_members(post_vote_members);
				String userId = service.selectByM_id(Integer.parseInt(post.getM_id())).getM_userid();
				view.setUserId(userId);

				feed.add(view);
			}
			return response(feed, true, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("목록조회실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}

	}

	@GetMapping("/Member/{userId}/Vote")
	@ApiOperation("ID에 해당하는 유저가 참석 의사를 밝힌 v_id들의 리스트를 반환한다.")
	public ResponseEntity<Map<String, Object>> getUserVote(@PathVariable String userId) {
		try {
			List<Vol> voteList = service.searchVote(userId);
			return response(voteList, true, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("목록조회실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}

	}

	@PatchMapping("/Member/{userId}")
	@ApiOperation("전달받은 회원정보 를 가지고 세부정보를 등록한다.(야메방법)")
	public ResponseEntity<Map<String, Object>> patchMember(@PathVariable String userId,
			@RequestBody MemberPatchRequest memberPatchRequest) {
		try {
			boolean result = service.patchUpdate(userId, memberPatchRequest);
//			if (!result) {
//				throw new TransactionException();
//
//			}
			return response(result, true, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("회원정보 수정 실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}

	@GetMapping("/Member/{userId}/PreferDetail")
	@ApiOperation("ID에 해당하는 유저의 선호정보까지 반환한다. ")
	public ResponseEntity<Map<String, Object>> getMemberPreferDetail(@PathVariable String userId) {
		try {

			Member_detail member_detail = service.searchDetail(userId);
			// 현재 유저검색은 로그인 된 사람만 가능
			if (member_detail != null) {
				System.out.println(member_detail.getM_userid());

				return response(member_detail, true, HttpStatus.OK);
			} else {
				return response(null, true, HttpStatus.OK);
			}
		} catch (Exception e) {
			logger.error("회원조회실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}

	@PutMapping("/Member/Password")
	@ApiOperation("회원의 비밀번호 재설정")
	public ResponseEntity<Map<String, Object>> changeMemberPassword(@RequestBody Member member) {
		try {
			boolean check = service.alter_userPassword(member.getM_email(), member.getM_password());
			if (check) {
				return response(true, true, HttpStatus.OK);
			} else {
				return response(false, true, HttpStatus.OK);
			}
		} catch (Exception e) {
			logger.error("회원조회실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}

	// 삭제/업데이트 될경우 더미데이터로 aws에 남는데 그거 처리하는 과정은 일단 안만듬
	@PostMapping("/Member/PostProfile/{m_id}")
	@ApiOperation("회원의 프로필사진 게시버튼클릭(첨부사진은 1개로 정하였다, 만약에 첨부사진이 있다면 업데이트 없다면 프로필사진이 삭제된다.) - 파일은 기존방식대로, m_id는 url로 받는다.")
	public ResponseEntity<Map<String, Object>> insertProfile(@RequestParam(value = "file", required = false) MultipartFile file,
			@PathVariable int m_id) {// , @RequestParam("m_id") int m_id) {
		try {
			Map<String, Object> resultMap = new HashMap<String, Object>();
			FileUploadResponse fileResponses = null;
			if (file != null) {
				fileResponses = f_con.uploadProfile(file, m_id);
			} else {
				f_con.deleteProfile(m_id);
			}
			resultMap.put("fileResponses", fileResponses);

			return response(resultMap, true, HttpStatus.CREATED);
			// return response(fileResponse, true, HttpStatus.CREATED);
		} catch (RuntimeException e) {
			logger.error("포스트 등록 실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}

	/*
	 * @GetMapping("/Member/ViewProfile/{userId}") 미작성
	 * 
	 * @ApiOperation("회원의 프로필사진 게시버튼클릭(첨부사진은 1개로 정하였다, 만약에 첨부사진이 있다면 업데이트 없다면 프로필사진이 삭제된다.) - 파일은 기존방식대로, m_id는 url로 받는다."
	 * ) public ResponseEntity<Map<String, Object>> getProfile(@PathVariable int
	 * userId) { try { Map<String, Object> resultMap = new HashMap<String,
	 * Object>(); FileUploadResponse fileResponses = null; if (file != null) {
	 * fileResponses = f_con.uploadProfile(file, m_id); } else {
	 * f_con.deleteProfile(m_id); } resultMap.put("fileResponses", fileResponses);
	 * 
	 * return response(resultMap, true, HttpStatus.CREATED); // return
	 * response(fileResponse, true, HttpStatus.CREATED); } catch (RuntimeException
	 * e) { logger.error("포스트 등록 실패", e); return response(e.getMessage(), false,
	 * HttpStatus.CONFLICT); } }
	 */

}
