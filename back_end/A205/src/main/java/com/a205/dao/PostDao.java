package com.a205.dao;

import java.util.List;

import com.a205.dto.MyFilter;
import com.a205.dto.Post;
import com.a205.dto.Post_input;
import com.a205.dto.Post_vote;
import com.a205.dto.Vol;

public interface PostDao {
	public Post selectOne(int p_id);

	//public List<Post> searchAll() ;

	public boolean add(Post_input Post) ;

	public boolean update(Post Post) ;

	//boolean remove(int p_id, int m_id);
	public boolean addPostVote(Post_vote post_vote);
	public boolean removePostVote(Post_vote post_vote);

	public List<Integer> countM_id(int p_id);
	
	boolean remove(int p_id);
	
	int getid();
	
	
	public List<Integer> selectP_idByFilterWithoutFollerings(int listSize, int startList, MyFilter my, Integer m_id);
	

	public List<Integer> searchMyFeed(int m_id, int no1, int no2);
	public List<Integer> searchVolFeed(int v_id, int no1, int no2);

	public List<Integer> searchMyPosts(int m_id, int no1, int no2);
	
//	public int addViewCnt(int no);
//	public int getViewCnt(int no);
//	
//	public List<Post> searchByCondition(String condition, String key);
//	
//	
//	public int getBoardListCnt() ;
//	public List<Post> searchbypage(Pagination p);
	
}
