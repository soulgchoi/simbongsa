package com.a205.controller;

import java.util.HashMap;
import java.util.Map;

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

import com.a205.dto.Member;
import com.a205.service.FollowServive;

import io.swagger.annotations.ApiOperation;

@CrossOrigin("*")
@RestController
public class FollowController {

	private static final Logger Logger = LoggerFactory.getLogger(FollowRestController.class);
	
	@Autowired
	FollowServive service;

	private ResponseEntity<Map<String, Object>> response(Object data, boolean status, HttpStatus hStatus){ 
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("status", status);
		resultMap.put("data", data);
		return new ResponseEntity<>(resultMap, hStatus);
	}

	@PostMapping("/follow/{followee}")
	@ApiOperation("현재 유저가 followee를 follow 하겠다.")
	public ResponseEntity<Map<String, Object>> getMember(@PathVariable String followee, HttpSession session){
		try {
			// if follower 는 나이고, followee는 변수에담긴 follow 객체가 있다면, 
			Member member = service.search(userId);
// 현재 유저검색은 로그인 된 사람만 가능
			if (member.getM_userid() !=  null ) {
				System.out.println(member.getM_userid() + ", " + session.getAttribute("userid"));

				return response(member, true, HttpStatus.OK);
			} else {
				System.out.println(member.getM_userid() + ", " + session.getAttribute("userid"));
				return response(null, true, HttpStatus.OK);
			}
		}catch(Exception e) {
			logger.error("회원조회실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}

}
