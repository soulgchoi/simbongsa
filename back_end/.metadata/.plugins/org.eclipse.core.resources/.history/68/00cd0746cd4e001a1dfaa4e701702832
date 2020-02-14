package com.a205.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.a205.config.JwtTokenUtil;
import com.a205.dao.MemberDAO;
import com.a205.dto.Member;
import com.a205.service.MemberService;
import com.a205.service.UserMailSendService;
import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = "*")
@Controller
public class EmailController {
	
	private static final Logger logger = LoggerFactory.getLogger(MemberRestController.class);
	
	@Autowired
	private UserMailSendService mailsender;
	
	@Autowired
	private MemberDAO memberDao;
	
	@Autowired
	private MemberService memberService;
	
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	
	private ResponseEntity<Map<String, Object>> response(Object data, boolean status, HttpStatus hStatus){ 
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("status", status);
		resultMap.put("data", data);
		return new ResponseEntity<>(resultMap, hStatus);
	}
	
	@PostMapping("/email/regist")
	@ApiOperation("등록할 m_email에 대한 이메일을 전송한다.")
	public ResponseEntity<Map<String, Object>> registEmail(@RequestBody Member member) {
		try {
			boolean result = mailsender.mailSendWithUserKey(member.getM_email());
			return response(result, true, HttpStatus.CREATED);
		} catch (RuntimeException e) {
			logger.error("이메일 등록 실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}
	
	@PostMapping("/email/change")
	@ApiOperation("비밀번호를 변경 이메일을 전송한다.")
	public ResponseEntity<Map<String, Object>> sendPassMail(@RequestBody Member member) {
		try {
			boolean result = mailsender.mailSendForPassword(member.getM_email());
			return response(result, true, HttpStatus.CREATED);
		} catch (RuntimeException e) {
			logger.error("이메일 등록 실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}
	
	@GetMapping("/email/enter")
	@ApiOperation("전달받은 이메일 인증한다.")
	public ResponseEntity<Map<String, Object>> enterEmail(@RequestParam String m_email, @RequestParam String m_key) {
		try {
			boolean result =  memberDao.alter_userKey(m_email, m_key)>0 ? true : false;
			return response(result, true, HttpStatus.CREATED);
		} catch (RuntimeException e) {
			logger.error("이메일 등록 실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}
	
	@PostMapping("/email/password")
	@ApiOperation("전달받은 이메일 인증한다.")
	public ResponseEntity<Map<String, Object>> changePass(@RequestBody Map<String,String> map) {
		try {
			String token = map.get("token");
			String password = map.get("password");
					
			String username = jwtTokenUtil.getUsernameFromToken(token);
			Member member = memberDao.searchByEmail(username);
			boolean result =  memberService.alter_userPassword(member.getM_email(), password);
			return response(result, true, HttpStatus.CREATED);
		} catch (RuntimeException e) {
			logger.error("비밀번호 변경 실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}
}
