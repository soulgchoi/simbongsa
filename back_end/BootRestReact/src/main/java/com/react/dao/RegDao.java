package com.react.dao;

import org.apache.ibatis.session.SqlSession;

import com.react.vo.Region;

public class RegDao {
	//@Autowired
	SqlSession session;
	
	public boolean addReg(Region reg) throws Exception {//모든 직원 정보
		return session.insert("volunteer.addReg", reg) >0;
	}

}
