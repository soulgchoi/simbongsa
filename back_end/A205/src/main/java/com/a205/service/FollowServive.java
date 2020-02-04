package com.a205.service;

import java.util.List;

import com.a205.dto.Member;
import com.a205.dto.Follow;

public interface FollowServive {

	public List<Member> searchFollowers(String userId);
	
	public List<Member> searchFollowees(String userId);
	
	public boolean add(String userEmail, String followee);
	
	public boolean remove(String userEmail, String followee);

}
