package com.a205.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.a205.dto.Member;
import com.a205.dto.Member_detail;
import com.a205.dto.Post;
import com.a205.dto.Vol;

@Repository
public class MemberDAOImp implements MemberDAO {
	
	private final String ns = "com.a205.model.membermapper.";

	@Autowired
	SqlSession session;
	
	@Override
	public Member search(String userId) {
		String statement = ns+"select";
		return session.selectOne(statement, userId);
	}
	
	@Override
	public Member searchByEmail(String email) {
		String statement = ns+"selectByEmail";
		return session.selectOne(statement, email);
	}

	@Override
	public List<Member> searchAll() {
		String statement = ns+"select";
		
		return session.selectList(statement);
	}
	
	@Override
	public Member selectByM_id(Integer m_id){
		String statement = ns+"selectBym_id";
		return session.selectOne(statement, m_id);

	}


	@Override
	public boolean add(Member member) {
		String statement = ns+"insert";
		return session.insert(statement, member)>0;
	}
	
	@Override
	public boolean add2(Member member) {
		String statement = ns+"insert2";
		return session.insert(statement, member)>0;
	}
	
	@Override
	public boolean addNoPassword(Member member) {
		String statement = ns+"insertNoPass";
		return session.insert(statement, member)>0;
	}

	@Override
	public boolean update(Member member) {
		String statement = ns+"update";
		return session.update(statement, member)>0;
	}

	@Override
	public boolean remove(String id) {
		String statement = ns+"delete";
		return session.delete(statement, id)>0;
	}
	
	//나의 포스트가 아니고 내가 팔로우하는 사람들의 포스트여야 될것같아요
	@Override
	public List<Post> searchPost(Integer m_id){
		
		String statement = ns+"selectListPost";
		
		return session.selectList(statement, m_id);

	}
	
	@Override
	public List<Vol> searchVote(int m_id){
		
		String statement = ns+"selectListVote";
		
		return session.selectList(statement, m_id);

	}

	
	@Override
	public int GetKey(String m_email, String m_key) {
		String statement = ns+"GetKey";
		Map<String, String> map = new HashMap<>();
		map.put("param1", m_email);
		map.put("param2", m_key);
		return session.update(statement, map);
	}
	
	@Override
	public int alter_userKey(String m_email, String m_key) {
		String statement = ns+"alter_userKey";
		Map<String, String> map = new HashMap<>();
		map.put("param1", m_email);
		map.put("param2", m_key);
		return session.update(statement, map);
	}

	@Override
	public boolean alter_userPassword(String m_email, String m_password) {
		String statement = ns+"alter_password";
		Map<String, String> map = new HashMap<>();
		map.put("param1", m_email);
		map.put("param2", m_password);
		return session.update(statement, map)>0;
	}

}
