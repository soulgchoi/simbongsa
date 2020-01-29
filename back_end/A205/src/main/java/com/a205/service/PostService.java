package com.a205.service;

import java.util.List;

import com.a205.dto.Post;
import com.a205.dto.Pagination;


public interface PostService {
	public Post search(int no);
	public List<Post> searchAll();

	public boolean add(Post Post);
	public boolean update(Post Post);
	public boolean remove(int no);
	
	Integer getViewCnt(Integer no);
	Integer addViewCnt(Integer no);
	
	List<Post> searchByCondition(String condition,String key);

	
	Integer getTotalPostListCnt();
	List<Post> getPostpage(Pagination p);
	
}
