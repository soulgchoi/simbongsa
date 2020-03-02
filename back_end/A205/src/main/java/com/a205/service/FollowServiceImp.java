package com.a205.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a205.dao.FollowDAO;
import com.a205.dto.Follow;
import com.a205.dto.Member;

@Service
public class FollowServiceImp implements FollowServive {
	private static Logger Logger = LoggerFactory.getLogger(FollowServiceImp.class);
	
	@Autowired
	private FollowDAO followDao;
	
	@Override
	public List<Member> searchFollowers(String userId) {
		return followDao.searchFollowers(userId);
	}

	@Override
	public List<Member> searchFollowees(String userId) {
		return followDao.searchFollowees(userId);
	}
	@Override
	public boolean add(String follower_userid, String followee_userid) {
		return followDao.add(follower_userid, followee_userid);
	}
	@Override
	public boolean remove(String follower_userid, String followee_userid) {
		return followDao.remove(follower_userid, followee_userid);
	}
}
