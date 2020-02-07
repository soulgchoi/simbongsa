package com.a205.dao;

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

}
