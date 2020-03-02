package com.a205.dao;

import java.util.List;

import com.a205.dto.Member;
import com.a205.dto.Follow;

public interface FollowDAO {

	public List<Member> searchFollowers(String userId);
	
	public List<Member> searchFollowees(String userId);

	public boolean add(String userEmail, String followee);
	
	public boolean remove(String userEmail, String followee);

	public boolean search(String follower, String followee);

}
