package com.a205.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.a205.dto.Category;

@Repository
public class CateDao {
	@Autowired
	SqlSession session;
	
	public boolean addCate(Category cate) throws Exception {//모든 직원 정보
		return session.insert("volunteer.addCate", cate) >0;
	}

}
