package com.a205.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.a205.dto.Vol;

@Repository
public class VolDaoImpl {

	private final static String ns = "com.a205.model.volmapper.";

	@Autowired
	SqlSession session;

	public List<String> searchVolPage(int listSize, int startList) {
		String statement = ns + "select";
		
		Map<String, Integer> map = new HashMap<>();
		map.put("listSize", listSize);
		map.put("startList", startList);
		return session.selectList(statement, map);
	}

}