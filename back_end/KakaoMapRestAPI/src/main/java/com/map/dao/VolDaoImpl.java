package com.map.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.map.dto.Vol;

@Repository
public class VolDaoImpl implements VolDao {

	private final static String ns = "com.map.model.volmapper.";

	@Autowired
	SqlSession session;

	public Vol searchVol(int v_id) {
		String statement = ns + "selectOne";
		
		return session.selectOne(statement, v_id);
	}

	@Override
	public List<Vol> searchAll() {
		String statement = ns +"select";
		return session.selectList(statement);
	}
	
	@Override
	public boolean update(Vol vol) {
		String statement = ns+"update";
		return session.update(statement, vol)>0;
	}

}