package com.a205.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.a205.dto.Member_has_category;

@Repository
public class MemberHasCategoryDAOImp implements MemberHasCategoryDAO{
	private String ns = "com.a205.model.memberhascategorymapper.";
	
	@Autowired
	SqlSession session;
	
	public boolean add(Member_has_category member_has_category) {
		String statement = ns+"insert";
		return session.insert(statement, member_has_category)>0;

	}
	
	public List<String> searchByM_id(int m_id){
		String statement = ns+"selectByM_id";

		return session.selectList(statement, m_id);
	}
	
	public boolean remove(int m_id) {
		String statement = ns+"delete";
		return session.delete(statement, m_id)>0;

	}


}
