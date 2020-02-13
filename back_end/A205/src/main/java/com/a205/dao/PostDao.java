package com.a205.dao;

import java.util.List;

import com.a205.dto.Post;
import com.a205.dto.Post_vote;

public interface PostDao {
	public Post selectOne(int p_id);

	//public List<Post> searchAll() ;

	public boolean add(Post Post) ;

	public boolean update(Post Post) ;

	//boolean remove(int p_id, int m_id);
	public boolean addPostVote(Post_vote post_vote);

	
	boolean remove(int p_id);
	
	int getid();

	public List<Integer> searchFeed(int m_id);
	
//	public int addViewCnt(int no);
//	public int getViewCnt(int no);
//	
//	public List<Post> searchByCondition(String condition, String key);
//	
//	
//	public int getBoardListCnt() ;
//	public List<Post> searchbypage(Pagination p);
	
}
