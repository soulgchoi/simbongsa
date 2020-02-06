package com.a205.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.a205.dto.Member_has_region;

@Repository
public class MemberHasRegionDAOImp implements MemberHasRegionDAO{
	
	private final String ns = "com.a205.model.memberhasregionmapper.";

	@Autowired
	SqlSession session;

	public boolean add(Member_has_region member_has_region) {
		String statement = ns+"insert";
		
		return session.insert(statement, member_has_region)>0;
	}

}
