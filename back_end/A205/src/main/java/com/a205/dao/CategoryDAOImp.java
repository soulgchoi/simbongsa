package com.a205.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.a205.dto.Category;
@Repository
public class CategoryDAOImp implements CategoryDAO{
	private final static String ns = "com.a205.model.categorymapper.";

	@Autowired
	SqlSession session;

	@Override
	public Category selectOne(String ca_highCd, String ca_lowCd) {
		String statement = ns + "selectOne";
		Map<String, String> map = new HashMap<>();
		map.put("ca_highCd", ca_highCd);
		map.put("ca_lowCd", ca_lowCd);

		
		return session.selectOne(statement, map);

	}

	@Override
	public List<Category> selectList(String ca_highNm) {
		String statement = ns+ "selectList";
		return session.selectList(statement, ca_highNm);
	}

	@Override
	public List<Category> selectListByHighCd(String ca_highCd) {
		String statement = ns+ "selectListByHighCd";
		return session.selectList(statement, ca_highCd);
	}

}
