package com.a205.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a205.dao.MemberDAO;
import com.a205.dao.PostDao;
import com.a205.dto.MyFilter;
import com.a205.dto.Post;
import com.a205.dto.Post_input;
import com.a205.dto.Post_vote;

import io.swagger.models.auth.In;

@Service
public class PostServiceImpl implements PostService {

	@Autowired
	private PostDao dao;
	@Autowired
	private MemberDAO m_dao;
	
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
	public List<Integer> countM_id(int p_id) {
		return dao.countM_id(p_id);
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
	public boolean add(Post_input Post) {
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
	public List<Integer> searchMyPosts(String m_userId, int no1, int no2) {
		int m_id= m_dao.search(m_userId).getM_id();
		return dao.searchMyPosts(m_id, no1, no2);
	}
	
	@Override
	public List<Integer> searchVolFeed(int v_id, int no1, int no2){
		return dao.searchVolFeed(v_id, no1, no2);
	}
	
	@Override
	public List<Integer> selectP_idByFilterWithoutFollerings(int listSize, int startList, MyFilter my, Integer m_id){
		return dao.selectP_idByFilterWithoutFollerings(listSize, startList, my, m_id);
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
