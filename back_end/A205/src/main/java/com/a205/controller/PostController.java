package com.a205.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.a205.dto.Post;
import com.a205.service.PostService;

@Controller
public class PostController {

	@Autowired
	PostService service;

	@GetMapping("Post.do")
	public String getPostListView() {
		// List<Post> Postlist = service.searchAll();
		// System.out.println(Postlist);
		// model.addAttribute("Postlist", Postlist);
		return "/Post/list";
	}

	@GetMapping("/Post/detail.do")
	public String getRestPost(Post Post, Model model, HttpSession session, HttpServletRequest req) {
		try {
			String s = req.getParameter("no");
			if (s != null) {
				int n = Integer.parseInt(s);
				service.addViewCnt(n);
				Post selected = service.search(n);
				System.out.println(selected);
				model.addAttribute("PostNo", s);
			}
			System.out.println(s);
			return "/Post/detail";
		} catch (RuntimeException e) {
			model.addAttribute("message", "문제 내용 - 게시판 오류 발생 ");
			return "Error";
		}
	}

	@GetMapping("Post/regist.do")
	public String getPostRegistForm(Model model) {

		model.addAttribute("edit_mode", "regist");
		return "/Post/edit";

		// System.out.println(service.searchAll());

	}

	@GetMapping("Post/modify.do")
	public String getPostModifyForm(HttpServletRequest req, Model model) {
		String no = req.getParameter("no");
		System.out.println(no);

		if (no == null) {
			return "redirect:/Post.do";
		}

		model.addAttribute("edit_mode", "modify");
		model.addAttribute("edit_no", no);

		return "/Post/edit";

		// System.out.println(service.searchAll());

	}

	@PostMapping("/Post/add.do")
	public String addPostAricle(Post newpost) {

		System.out.println(newpost);
		service.add(newpost);

		return "/Post/list";

	}

	/// Post/delete.do?no=
	@PostMapping("Post/delete.do")
	public String deletePostAricle(HttpServletRequest req, Model model) {
		String no = req.getParameter("no");
		System.out.println("test" + no);

		if (no == null) {
			return "redirect:/Post.do";
		}

		service.remove(Integer.parseInt(no));

		return "/Post/list";

	}

}
