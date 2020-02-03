package com.a205.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
	public ResponseEntity<Map<String, Object>> getMember(@PathVariable String followee, HttpServletRequest request){
		
		
		final String requestTokenHeader = request.getHeader("Authorization");
		String userEmail = null;
		String jwtToken = null;
		System.out.println(requestTokenHeader);
		jwtToken = requestTokenHeader.substring(7);

		userEmail = jwtTokenUtil.getUsernameFromToken(jwtToken);
		String userId = member.searchByEmail(userEmail).getM_userid();
		System.out.println(userEmail);
		System.out.println(userId);
		System.out.println(jwtToken);
		System.out.println(followee);

		// JWT Token is in the form "Bearer token". Remove Bearer word and get
		// only the Token
		if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
			try {
				boolean result = service.add(userId, followee);
				return response(jwtToken, true, HttpStatus.OK);

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
}
