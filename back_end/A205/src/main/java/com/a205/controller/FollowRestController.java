package com.a205.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

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
import org.springframework.web.bind.annotation.RestController;

import com.a205.dto.Follow;
import com.a205.dto.Member;
import com.a205.service.FollowServive;

import io.jsonwebtoken.ExpiredJwtException;
import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = "*")
@RestController
public class FollowRestController {

	private static final Logger logger = LoggerFactory.getLogger(FollowRestController.class);

	@Autowired
	FollowServive service;

//	@Autowired
//	private JwtUserDetailsService jwtUserDetailsService;
//
//	@Autowired
//	private JwtTokenUtil jwtTokenUtil;
//
//	@Autowired
//	private MemberDAO member;

	private ResponseEntity<Map<String, Object>> response(Object data, boolean status, HttpStatus hStatus) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("status", status);
		resultMap.put("data", data);
		return new ResponseEntity<>(resultMap, hStatus);
	}

//	 /follow/{followerId}/{followeeId} 

//	@GetMapping("/follow/{followerId}/{followeeId}")
//	@ApiOperation("팔로우 버튼 모양 탐색")
//	public ResponseEntity<Map<String, Object>> SearchfollowMember(@PathVariable String followee, HttpServletRequest request){
////		try {
////			
////		}
//	}
//	
//	@GetMapping("/Member/{userId}")
//	@ApiOperation("ID에 해당하는 하나의 회원정보를 반환한다. ")
//	public ResponseEntity<Map<String, Object>> getMember(@PathVariable String userId){
//		try {
//			
//			Member member = service.search(userId);
//// 현재 유저검색은 로그인 된 사람만 가능
//			if (member != null ) {
//				System.out.println(member.getM_userid());
//
//				return response(member, true, HttpStatus.OK);
//			} else {
//				System.out.println(member.getM_userid() );
//				return response(null, true, HttpStatus.OK);
//			}
//		}catch(Exception e) {
//			logger.error("회원조회실패", e);
//			return response(e.getMessage(), false, HttpStatus.CONFLICT);
//		}
//	}

	@PostMapping("/follow")
	@ApiOperation("현재 유저(follower)가 followee_userid를 follow 하겠다.")
	public ResponseEntity<Map<String, Object>> insertfollowMember(@RequestBody Follow follow) {
		try {
			// Map<String, Object> resultMap = new HashMap<String, Object>();
			boolean result = service.add(follow.getFollower_userid(), follow.getFollowee_userid());
			return response(result, true, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("팔로우실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}

	@DeleteMapping("/follow")
	@ApiOperation("전달받은 회원을 팔로우 취소한다.")
	public ResponseEntity<Map<String, Object>> deleteFollowMember(@RequestBody Follow follow) {
		try {
			boolean result = service.remove(follow.getFollower_userid(), follow.getFollowee_userid());
			return response(result, true, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("팔로우취소실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);

		}
	}

	@GetMapping("follow/{userId}/followers")
	@ApiOperation("userId `를` following 한 사람들의 목록을 가져온다.")
	public ResponseEntity<Map<String, Object>> searchFollowers(@PathVariable String userId) {
		try {
			List<Member> result = service.searchFollowers(userId);
			return response(result, true, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("followers 목록 조회 실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}

	@GetMapping("follow/{userId}/followees")
	@ApiOperation("userId `가` following 한 사람들의 목록을 가져온다.")
	public ResponseEntity<Map<String, Object>> searchFollowees(@PathVariable String userId) {
		try {
			List<Member> result = service.searchFollowees(userId);
			return response(result, true, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("followees 목록 조회 실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}

}
