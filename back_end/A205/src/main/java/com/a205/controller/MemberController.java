package com.a205.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.a205.dto.Member;
import com.a205.service.MemberService;

import io.swagger.annotations.ApiOperation;

@Controller
@CrossOrigin(origins = "*")
public class MemberController {
	private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
	
	@Autowired
	MemberService service;
	
	private ResponseEntity<Map<String, Object>> response(Object data, boolean status, HttpStatus hStatus){ 
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("status", status);
		resultMap.put("data", data);
		return new ResponseEntity<>(resultMap, hStatus);
	}
	
	@PostMapping("login.do")
	@ApiOperation("전달받은 회원정보를 저장한다.")
	public ResponseEntity<Map<String, Object>> getLogin(@RequestBody Member member, Model model, HttpSession session){
		try {
			Member selected = service.search(member.getM_userid());
			boolean result = false;
			
			if(selected!=null && member.getM_password().equals(selected.getM_password())) {
				session.setAttribute("userid", selected.getM_userid());
				session.setAttribute("member", selected);
				
				model.addAttribute("member", selected);
				System.out.println(model.toString());
				System.out.println(session.getId());

				System.out.println(session.getAttribute("userid"));
				result = true;
				return response(session.getId(), true, HttpStatus.OK);
			}else {
				model.addAttribute("message", "비밀번호가 틀렸습니다");
				result = false;
				return response(result, false, HttpStatus.OK);
			}
		}catch(RuntimeException e) {
			model.addAttribute("message","문제 내용 - 로그인 중 오류 발생");
			return response(false, false, HttpStatus.CONFLICT);
		}
	}
	
	@GetMapping("logout.do")
	public ResponseEntity<Map<String, Object>> getLogout(HttpSession session) {
		System.out.println(session.getId());
		System.out.println(session.getAttribute("userid"));


		session.invalidate();
		System.out.println("-----"+session.getId());

		return response(true, true, HttpStatus.OK);
	}
	
	@GetMapping("index.do")
	public String getIndexForm() {
		return "index";
	}
	
	@GetMapping("restMember.do")
	public String getRestMember(Member member, Model model, HttpSession session) {
		// @ModelAttribute의 동작
		// 1.default constructor 호출 --> 빈 객체 생성
		// 2.request parameter를 분석해서 setter 호출 
		// 3.model attribute의 이름으로 Model 객체에 추가 ;model.addAttribute("model", model);
		try {
			System.out.println("member session" + session.getAttribute("member"));
//			session.setAttribute("member", session.getAttribute("member"));
			if(session.getAttribute("id")!=null) {
				String s = session.getAttribute("id").toString();
				Member selected = service.search(s);
				System.out.println(selected);
//				session.setAttribute("member", selected);
				model.addAttribute("member", selected);
			}
			return "member/MemberRest";
		}catch(RuntimeException e){
			model.addAttribute("message","문제 내용 -회원정보 오류 발생");
			return "Error";
		}
	}
	
}
