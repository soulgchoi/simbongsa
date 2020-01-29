package com.a205.controller;

import javax.servlet.http.HttpSession;
import javax.websocket.Session;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.a205.dto.Member;
import com.a205.service.MemberService;

@Controller
@CrossOrigin
public class MemberController {
	private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
	
	@Autowired
	MemberService service;
	
	
	@PostMapping("login.do")
	public String getLogin(Member member, Model model, HttpSession session) {
		try {
			Member selected = service.search(member.getM_id());
			
			if(selected!=null && member.getM_password().equals(selected.getM_password())) {
				session.setAttribute("id", selected.getM_id());
				session.setAttribute("member", selected);
				model.addAttribute("member", selected);
				return "redirect:/index.do";
			}else {
				model.addAttribute("message", "비밀번호가 틀렸습니다");
				return "redirect:/index.do";
			}
		}catch(RuntimeException e) {
			model.addAttribute("message","문제 내용 - 로그인 중 오류 발생");
			return "Error";
		}
	}
	
	@GetMapping("logout.do")
	public String getLogout(HttpSession session) {
		session.invalidate();
		return "redirect:/index.do";
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
