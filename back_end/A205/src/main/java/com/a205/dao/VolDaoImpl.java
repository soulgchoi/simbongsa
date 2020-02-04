package com.a205.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.a205.dto.Vol;
import com.a205.dto.Vol_Mini;

@Repository
public class VolDaoImpl implements VolDao {

	private final static String ns = "com.a205.model.volmapper.";

	@Autowired
	SqlSession session;

	public List<Vol_Mini> searchVolPage(int listSize, int startList) {
		String statement = ns + "selectList";
		
		Map<String, Integer> map = new HashMap<>();
		map.put("listSize", listSize);
		map.put("startList", (startList-1)*listSize);
		
		return session.selectList(statement, map);
	}
	
	public Vol searchVol(int v_id) {
		String statement = ns + "selectOne";
		
		return session.selectOne(statement, v_id);
	}

	@Override
	public List<Vol> searchAll() {
		String statement = ns +"select";
		return session.selectList(statement);
	}

}