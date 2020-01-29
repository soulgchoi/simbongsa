package com.a205.dao;

import java.util.List;

import com.a205.dto.Post;
import com.a205.dto.Pagination;

public interface PostDao {
	public Post search(int no) ;

	public List<Post> searchAll() ;

	public boolean add(Post Post) ;

	public boolean update(Post Post) ;

	public boolean remove(int no) ;
	

	public int addViewCnt(int no);
	public int getViewCnt(int no);
	
	public List<Post> searchByCondition(String condition, String key);
	
	
	public int getBoardListCnt() ;
	public List<Post> searchbypage(Pagination p);
	
}
