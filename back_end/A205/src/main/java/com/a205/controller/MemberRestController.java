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
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.a205.dto.Member;
import com.a205.dto.Member_detail;
import com.a205.dto.Post;
import com.a205.model.MemberPatchRequest;
import com.a205.service.MemberService;

import io.swagger.annotations.ApiOperation;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/rest")
public class MemberRestController {
	
	private static final Logger logger = LoggerFactory.getLogger(MemberRestController.class);
	
	@Autowired
	MemberService service;

	private ResponseEntity<Map<String, Object>> response(Object data, boolean status, HttpStatus hStatus){ 
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("status", status);
		resultMap.put("data", data);
		return new ResponseEntity<>(resultMap, hStatus);
	}
	
	@GetMapping("/Member")
	@ApiOperation("전체 회원정보를 반환한다.")
	public ResponseEntity<Map<String, Object>> getAllMember(){
		try {
			List<Member> list = service.searchAll();
			return response(list, true, HttpStatus.OK);
		}catch(Exception e) {
			logger.error("목록조회실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}
	
	@SuppressWarnings("null")
	@GetMapping("/Member/{userId}")
	@ApiOperation("ID에 해당하는 하나의 회원정보를 반환한다. ")
	public ResponseEntity<Map<String, Object>> getMember(@PathVariable String userId){
		try {
			
			Member member = service.search(userId);
// 현재 유저검색은 로그인 된 사람만 가능
			if (member != null ) {
				System.out.println(member.getM_userid());

				return response(member, true, HttpStatus.OK);
			} else {
				System.out.println(member.getM_userid() );
				return response(null, true, HttpStatus.OK);
			}
		}catch(Exception e) {
			logger.error("회원조회실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}
	
	@GetMapping("/CheckId/{userId}")
	@ApiOperation("현재 DB에서 id가 존재하는지 체크 후 boolean 값으로 반환")
	public ResponseEntity<Map<String,Object>> checkId(@PathVariable String userId){
		try {
			if(service.checkID(userId)) {
				return response(true, true, HttpStatus.OK);
			}else {
				return response(false, true, HttpStatus.OK);
			}
		}catch(Exception e) {
			logger.error("회원조회실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}
	
	@GetMapping("/CheckEmail/{email}")
	@ApiOperation("현재 DB에서 email이 존재하는지 체크 후 boolean 값으로 반환")
	public ResponseEntity<Map<String,Object>> checkEmail(@PathVariable String email){
		try {
			if(service.checkEmail(email)) {
				return response(true, true, HttpStatus.OK);
			}else {
				return response(false, true, HttpStatus.OK);
			}
		}catch(Exception e) {
			logger.error("회원조회실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}
	
	@PutMapping("/Member/{userId}")
	@ApiOperation("전달받은 회원정보를 업데이트한다.")
	public ResponseEntity<Map<String, Object>> updateMember(@RequestBody Member member){
		
		
		try {
			boolean result = service.update(member);
			return response(result, true, HttpStatus.OK);
		}catch(Exception e) {
			logger.error("회원정보 수정 실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}
	
	@DeleteMapping("/Member/{id}")
	@ApiOperation("전달받은 회원정보를 삭제한다.")
	public ResponseEntity<Map<String, Object>> deleteMember(@PathVariable String id, HttpSession session){
		try {
			boolean result = service.remove(id);
			if(result==true) {
				session.invalidate();
			}
			return response(result, true, HttpStatus.OK);
		}catch(Exception e) {
			logger.error("회원 탈퇴 실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}
	
	@GetMapping("/Member/{userId}/Post")
	@ApiOperation("ID에 해당하는 유저가 생성한 글들을 불러온다.(내가 쓴 포스트)")
	public ResponseEntity<Map<String, Object>> getUserPost(@PathVariable String userId){
		try {
			List<Post> postList = service.searchPost(userId);
			return response(postList, true, HttpStatus.OK);
		}catch(Exception e) {
			logger.error("목록조회실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}

	}
	
	@PatchMapping("/Member/{userId}")
	@ApiOperation("전달받은 회원정보 를 가지고 세부정보를 등록한다.(야메방법)")
	public ResponseEntity<Map<String, Object>> patchMember(@PathVariable String userId, @RequestBody MemberPatchRequest memberPatchRequest){
		try {
			boolean result = service.patchUpdate(userId, memberPatchRequest);
//			if (!result) {
//				throw new TransactionException();
//
//			}
 			return response(result, true, HttpStatus.OK);
		}catch(Exception e) {
			logger.error("회원정보 수정 실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}
	
	@GetMapping("/Member/{userId}/PreferDetail")
	@ApiOperation("ID에 해당하는 유저의 선호정보까지 반환한다. ")
	public ResponseEntity<Map<String, Object>> getMemberPreferDetail(@PathVariable String userId){
		try {
			
			Member_detail member_detail = service.searchDetail(userId);
			// 현재 유저검색은 로그인 된 사람만 가능
			if (member_detail != null ) {
				System.out.println(member_detail.getM_userid());

				return response(member_detail, true, HttpStatus.OK);
			} else {
				return response(null, true, HttpStatus.OK);
			}
		}catch(Exception e) {
			logger.error("회원조회실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}

}
