package com.a205.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.a205.config.JwtTokenUtil;
import com.a205.dao.MemberDAO;
import com.a205.dto.Member;
import com.a205.service.FollowServive;
import com.a205.service.JwtUserDetailsService;

import io.jsonwebtoken.ExpiredJwtException;
import io.swagger.annotations.ApiOperation;

@CrossOrigin("*")
@RestController
public class FollowController {

	private static final Logger Logger = LoggerFactory.getLogger(FollowController.class);
	
	@Autowired
	FollowServive service;

	@Autowired
	private JwtUserDetailsService jwtUserDetailsService;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private MemberDAO member;
	
	private ResponseEntity<Map<String, Object>> response(Object data, boolean status, HttpStatus hStatus){ 
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("status", status);
		resultMap.put("data", data);
		return new ResponseEntity<>(resultMap, hStatus);
	}

	@PostMapping("/follow/{followee}")
	@ApiOperation("현재 유저가 followee를 follow 하겠다.")
	public ResponseEntity<Map<String, Object>> followMember(@PathVariable String followee, HttpServletRequest request){
		
		
		final String requestTokenHeader = request.getHeader("Authorization");
		String userEmail = null;
		String jwtToken = null;
		System.out.println(requestTokenHeader.toString());
		jwtToken = requestTokenHeader.substring(7);

		userEmail = jwtTokenUtil.getUsernameFromToken(jwtToken);

		// JWT Token is in the form "Bearer token". Remove Bearer word and get
		// only the Token
		if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
			try {
				boolean result = service.add(userEmail, followee);
				return response(result, true, HttpStatus.OK);

			} catch (IllegalArgumentException e) {
				System.out.println("Unable to get JWT Token");
				return response(e.getMessage(), false, HttpStatus.CONFLICT);

			} catch (ExpiredJwtException e) {
				System.out.println("JWT Token has expired");
				return response(e.getMessage(), false, HttpStatus.CONFLICT);

			}
		} else {
			Logger.warn("JWT Token does not begin with Bearer String");
			return response(false, false, HttpStatus.CONFLICT);

		}
	
	}
	
	@DeleteMapping("follow/{followee}")
	@ApiOperation("전달받은 회원을 팔로우 취소한다.")
	public ResponseEntity<Map<String, Object>> deleteFollowingMember(@PathVariable String followee, HttpServletRequest request){
		
		final String requestTokenHeader = request.getHeader("Authorization");
		String userEmail = null;
		String jwtToken = null;
		System.out.println(requestTokenHeader.toString());
		jwtToken = requestTokenHeader.substring(7);

		userEmail = jwtTokenUtil.getUsernameFromToken(jwtToken);

		// JWT Token is in the form "Bearer token". Remove Bearer word and get
		// only the Token
		if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
			try {
				boolean result = service.remove(userEmail, followee);
				return response(result, true, HttpStatus.OK);

			} catch (IllegalArgumentException e) {
				System.out.println("Unable to get JWT Token");
				return response(e.getMessage(), false, HttpStatus.CONFLICT);

			} catch (ExpiredJwtException e) {
				System.out.println("JWT Token has expired");
				return response(e.getMessage(), false, HttpStatus.CONFLICT);

			}
		} else {
			Logger.warn("JWT Token does not begin with Bearer String");
			return response(false, false, HttpStatus.CONFLICT);
		}
	}
	@GetMapping("follow/{userId}/followers")
	@ApiOperation("userId `를` following 한 사람들의 목록을 가져온다.")
	public ResponseEntity<Map<String, Object>> searchFollowers(@PathVariable String userId){
		
		try {
			List<Member> result = service.searchFollowers(userId);
			return response(result, true, HttpStatus.OK);
		} catch (Exception e) {
			Logger.error("followers 목록 조회 실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}

	}

	@GetMapping("follow/{userId}/followees")
	@ApiOperation("userId `가` following 한 사람들의 목록을 가져온다.")
	public ResponseEntity<Map<String, Object>> searchFollowees(@PathVariable String userId){
		
		try {
			List<Member> result = service.searchFollowees(userId);
			return response(result, true, HttpStatus.OK);
		} catch (Exception e) {
			Logger.error("followers 목록 조회 실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}

	}

}
