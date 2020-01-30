package com.a205.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.a205.dto.Region;

@Repository
public class RegDao {
	@Autowired
	SqlSession session;
	
	public boolean addReg(Region reg) throws Exception {//모든 직원 정보
		return session.insert("volunteer.addReg", reg) >0;
	}

}
