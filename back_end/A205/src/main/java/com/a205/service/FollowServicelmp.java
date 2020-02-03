package com.a205.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a205.dao.FollowDAO;
import com.a205.dto.Follow;

@Service
public class FollowServicelmp implements FollowServive {
	private static Logger Logger = LoggerFactory.getLogger(MemberServiceImp.class);
	
	@Autowired
	private FollowDAO followDao;
	
	public boolean add(String userId, String followee) {
		return followDao.add(userId, followee);
	}
	
	public boolean remove(String userId, String followee) {
		return followDao.remove(userId, followee);
	}
}
