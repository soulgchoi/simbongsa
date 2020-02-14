package com.a205.dao;

import java.util.List;
import java.util.HashMap;
import java.util.Map;


import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.a205.dto.Member;
import com.a205.service.MemberService;
import com.a205.dto.Follow;


@Repository
public class FollowDAOImp implements FollowDAO {
	
	
	@Autowired
	private MemberDAO memberDao;
	private final String ns = "com.a205.model.followmapper.";

	
	@Autowired
	SqlSession session;

	@Override
	public List<Member> searchFollowers(String userId){
		String statement = ns+ "searchFollowers";
		int userId_pk = memberDao.search(userId).getM_id();
		return session.selectList(statement, userId_pk);
	}
	
	@Override
	public List<Member> searchFollowees(String userId){
		String statement = ns+ "searchFollowees";
		int userId_pk = memberDao.search(userId).getM_id();
		return session.selectList(statement, userId_pk);
	}
	
	@Override
<<<<<<< HEAD
	public boolean add(String follower_userid, String followee_userid) {
=======
	public boolean search(String follower, String followee) {
		String statement = ns+"selectOne";
		
		int userId_pk = memberDao.search(follower).getM_id();
		int followee_pk = memberDao.search(followee).getM_id();
		Map<String, Integer> map = new HashMap<>();
		map.put("userId_pk", userId_pk);
		map.put("followee_pk", followee_pk);
		
		return session.selectOne(statement, map)!=null;
	}
	
	@Override
	public boolean add(String userEmail, String followee) {
>>>>>>> feature/social
		String statement = ns+ "insert";
		//System.out.println("___followdao");

		int userId_pk = memberDao.search(follower_userid).getM_id();
		int followee_pk = memberDao.search(followee_userid).getM_id();
		System.out.println(userId_pk);
		System.out.println(followee_pk);
		Map<String, Integer> map = new HashMap<>();
		map.put("userId_pk", userId_pk);
		map.put("followee_pk", followee_pk);
		System.out.println(map);
		return session.insert(statement, map)>0;
	}

	@Override
	public boolean remove(String userEmail, String followee) {
		String statement = ns+"delete";
		
		int userId_pk = memberDao.searchByEmail(userEmail).getM_id();
		int followee_pk = memberDao.search(followee).getM_id();
		
		Map<String, Integer> map = new HashMap<>();
		map.put("userId_pk", userId_pk);
		map.put("followee_pk", followee_pk);
		
		return session.delete(statement, map)>0;

	}
}
