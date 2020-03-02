package com.a205.dao;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.a205.dto.Region;

@Repository
public class RegionDAOImp implements RegionDAO{
	
	private final static String ns = "com.a205.model.regionmapper.";

	@Autowired
	SqlSession session;

	@Override
	public Region selectOne(String r_sidoCd, String r_gugunCd) {
		String statement = ns + "selectOne";
		Map<String, Integer> map = new HashMap<>();
		map.put("r_sidoCd", Integer.parseInt(r_sidoCd));
		map.put("r_gugunCd", Integer.parseInt(r_gugunCd));

		
		return session.selectOne(statement, map);
	}

	@Override
	public Region selectByR_id(Integer r_id) {
		String statement = ns + "selectByR_id";
		return session.selectOne(statement, r_id);

	}


}
