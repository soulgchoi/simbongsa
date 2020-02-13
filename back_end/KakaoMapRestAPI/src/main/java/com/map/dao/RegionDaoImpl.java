package com.map.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.map.dto.Region;

@Repository
public class RegionDaoImpl implements RegionDao {

	private final static String ns = "com.map.model.regionmapper.";

	@Autowired
	SqlSession session;

	public Region searchRegion(int r_id) {
		String statement = ns + "selectOne";
		
		return session.selectOne(statement, r_id);
	}

	@Override
	public List<Region> searchAll() {
		String statement = ns +"select";
		return session.selectList(statement);
	}

}