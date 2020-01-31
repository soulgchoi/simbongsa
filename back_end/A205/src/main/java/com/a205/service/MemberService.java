package com.a205.service;

import java.util.List;

import com.a205.dto.Member;

public interface MemberService {
	public Member search(String userId);

	public List<Member> searchAll();

	public boolean login(String id, String pw);

	public boolean checkID(String id);

	public boolean checkEmail(String email);

	public boolean add(Member member);

	public boolean update(Member member);

	public boolean remove(String id);
}
