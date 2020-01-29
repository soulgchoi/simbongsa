package com.react.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.react.vo.Region;

@Repository
public class RegDao {
	@Autowired
	SqlSession session;
	
	public int addReg(Region reg) throws Exception {//모든 직원 정보
		return session.insert("volunteer.addReg", reg);
	}

}
