package com.a205.dao;

import java.util.List;

import com.a205.dto.Member;
import com.a205.dto.Post;

public interface MemberDAO {
	public Member search(String userId);

	public Member searchByEmail(String email);
	
	public List<Member> searchAll();

	public List<Post> searchPost(Integer m_id);

	public boolean add(Member member);

	public boolean update(Member member);

	public boolean remove(String id);
	
	
}
