package com.a205.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a205.dao.PostDao;
import com.a205.dto.Post;
import com.a205.dto.Post_vote;

@Service
public class PostServiceImpl implements PostService {

	@Autowired
	private PostDao dao;

	@Override
	public Post selectOne(int no) {
		return dao.selectOne(no);
	}

//	@Override
//	public List<Post> searchAll() {
//		return dao.searchAll();
//	}
	@Override
	public boolean addPostVote(Post_vote post_vote) {
		return dao.addPostVote(post_vote);
	}

	@Override
	public boolean update(Post Post) {
		return dao.update(Post);
	}
	
	@Override
	public boolean remove(int no) {
		return dao.remove(no);
	}

	@Override
	public boolean removePostVote(Post_vote post_vote) {
		System.out.println("--------------"+post_vote);
		return dao.removePostVote(post_vote);
	}

	@Override
	public boolean add(Post Post) {
		return dao.add(Post);
	}
	
	@Override
	public int getid() {
		return dao.getid();
	}
	
	@Override
	public List<Integer> searchMyFeed(int m_id, int no1, int no2){
		return dao.searchMyFeed(m_id, no1, no2);
	}
	
	@Override
	public List<Integer> searchVolFeed(int v_id, int no1, int no2){
		return dao.searchVolFeed(v_id, no1, no2);
	}
	
//	public Map<String, Object> selectBoardDetail(Map<String, Object> map) throws Exception {
//		//sampleDAO.updateHitCnt(map);
//		Map<String, Object> resultMap = new HashMap<String, Object>();
//		Map<String, Object> tempMap = dao.selectBoardDetail(map);
//		resultMap.put("map", tempMap);
//		List<Map<String, Object>> list = dao.selectFileList(map);
//		resultMap.put("list", list);
//		return resultMap;
//	}

	/*
	 * @Override public Integer addViewCnt(Integer no) {
	 * 
	 * 
	 * return dao.addViewCnt(no); }
	 * 
	 * @Override public Integer getViewCnt(Integer no) {
	 * 
	 * return dao.getViewCnt(no); }
	 * 
	 * @Override public List<Post> searchByCondition(String condition, String key) {
	 * 
	 * return dao.searchByCondition(condition, key); }
	 * 
	 * @Override public Integer getTotalPostListCnt() {
	 * 
	 * return dao.getBoardListCnt(); }
	 * 
	 * @Override public List<Post> getPostpage(Pagination p) {
	 * 
	 * return dao.searchbypage(p); }
	 */
}
