package com.a205.dao;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;

import com.a205.dto.Category;
import com.a205.dto.Region;

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


}
