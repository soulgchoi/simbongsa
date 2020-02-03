package com.a205.service;

import java.util.List;

import com.a205.dto.Member;
import com.a205.dto.Follow;

public interface FollowServive {

	public boolean add(String userId, String followee);
	
	public boolean remove(String userId, String followee);

}
