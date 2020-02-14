package com.a205.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = "*")
@Controller
public class ChattingController {

	private static final Logger logger = LoggerFactory.getLogger(MemberRestController.class);
	
	private ResponseEntity<Map<String, Object>> response(Object data, boolean status, HttpStatus hStatus){ 
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("status", status);
		resultMap.put("data", data);
		return new ResponseEntity<>(resultMap, hStatus);
	}
	
	@RequestMapping("/")
	public ModelAndView home() {
		ModelAndView mv = new ModelAndView("chat");
		return mv;
	}
	
//	@GetMapping("/email/enter2")
//	@ApiOperation("전달받은 이메일 인증한다.")
//	public ResponseEntity<Map<String, Object>> enterEmail(@RequestParam String m_email, @RequestParam String m_key) {
//		try {
//			boolean result =  memberDao.alter_userKey(m_email, m_key)>0 ? true : false;
//			return response(result, true, HttpStatus.CREATED);
//		} catch (RuntimeException e) {
//			logger.error("이메일 등록 실패", e);
//			return response(e.getMessage(), false, HttpStatus.CONFLICT);
//		}
//	}
}
