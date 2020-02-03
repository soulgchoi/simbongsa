package com.a205.dao;

import java.util.List;
import java.util.HashMap;
import java.util.Map;


import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.a205.dto.Member;
import com.a205.dto.Follow;


@Repository
public class FollowDAOlmp implements FollowDAO {
	
	private MemberDAO memberDao;
	
	private final String ns = "com.a205.model.followmapper.";

	
	@Autowired
	SqlSession session;

	@Override
	public boolean add(String userId, String followee) {
		String statement = ns+ "insert";
		int userId_pk = memberDao.search(userId).getM_id();
		int followee_pk = memberDao.search(followee).getM_id();
		
		Map<String, Integer> map = new HashMap<>();
		map.put("userId_pk", userId_pk);
		map.put("followee_pk", followee_pk);
		
		return session.insert(statement, map)>0;
	}

	@Override
	public boolean remove(String userId, String followee) {
		String statement = ns+"delete";
		
		int userId_pk = memberDao.search(userId).getM_id();
		int followee_pk = memberDao.search(followee).getM_id();
		
		Map<String, Integer> map = new HashMap<>();
		map.put("userId_pk", userId_pk);
		map.put("followee_pk", followee_pk);
		
		return session.delete(statement, map)>0;

	}
}
