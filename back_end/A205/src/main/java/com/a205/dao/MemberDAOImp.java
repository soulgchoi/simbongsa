package com.a205.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.a205.dto.Member;
import com.a205.dto.Member_detail;
import com.a205.dto.Post;

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
	public boolean add(Member member) {
		String statement = ns+"insert";
		return session.insert(statement, member)>0;
	}
	
	@Override
	public boolean addWithOutPassword(Member member) {
		String statement = ns+"insertNoPassword";
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
	
	@Override
	public List<Post> searchPost(Integer m_id){
		
		String statement = ns+"selectListPost";
		
		return session.selectList(statement, m_id);

	}


}
