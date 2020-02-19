package com.a205.service;

import java.util.List;

import com.a205.dto.MyFilter;
import com.a205.dto.Post;
import com.a205.dto.Post_input;
import com.a205.dto.Post_vote;
import com.a205.dto.Vol;


public interface PostService {
	public Post selectOne(int no);
//	public List<Post> searchAll();

	public boolean addPostVote(Post_vote post_vote);
	public boolean removePostVote(Post_vote post_vote);

	public boolean update(Post Post);
	public boolean remove(int no);

	public int getid();
	public List<Integer> countM_id(int p_id);

	public List<Integer> selectP_idByFilterWithoutFollerings(int listSize, int startList, MyFilter my, Integer m_id);

	public List<Integer> searchMyFeed(int m_id, int no1, int no2);
	public List<Integer> searchVolFeed(int v_id, int no1, int no2);

	public boolean add(Post_input post);

	public List<Integer> searchMyPosts(String m_userId, int no1, int no2);
	
//	Integer getViewCnt(Integer no);
//	Integer addViewCnt(Integer no);
//	
//	List<Post> searchByCondition(String condition,String key);
//
//	
//	Integer getTotalPostListCnt();
//	List<Post> getPostpage(Pagination p);
	
}
