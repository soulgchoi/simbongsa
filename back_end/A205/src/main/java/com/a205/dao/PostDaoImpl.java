package com.a205.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.a205.dto.Category;
import com.a205.dto.MyFilter;
import com.a205.dto.Post;
import com.a205.dto.Post_input;
import com.a205.dto.Post_vote;
import com.a205.dto.Vol;

import io.swagger.models.auth.In;

@Repository
public class PostDaoImpl implements PostDao {

	private final static String ns = "com.a205.model.postmapper.";

	@Autowired
	CategoryDAO categoryDao;
	
	@Autowired
	SqlSession session;

	@Override
	public Post selectOne(int p_id) {
		String statement = ns + "selectOne";
		return session.selectOne(statement, p_id);
	}
	
//	@Override
//	public List<Post> searchAll() {
//		String statement = ns + "select";
//
//		return session.selectList(statement);
//	}
	@Override
	public List<Integer> countM_id(int p_id) {
		String statement = ns + "countM_id";
		return session.selectList(statement, p_id);

	}

	@Override
	public boolean addPostVote(Post_vote post_vote) {
		String statement = ns + "insertPostVote";
		return session.insert(statement, post_vote)>0 ;
	}

	@Override
	public boolean add(Post_input Post) {
		String statement = ns + "insert";
		return session.insert(statement, Post) > 0;
	}

	@Override
	public boolean update(Post Post) {
		String statement = ns + "update";
		return session.update(statement, Post) > 0;
	}

//	@Override
//	public boolean remove(int p_id, int m_id) {
//		String statement = ns + "delete";
//		return session.delete(statement, p_id) > 0;
//	}
	
	@Override
	public boolean remove(int p_id) {
		String statement = ns + "delete";
		return session.delete(statement, p_id) > 0;
	}
	@Override
	public boolean removePostVote(Post_vote post_vote) {
		String statement = ns + "deletePostVote";
		System.out.println("-----dao"+post_vote);
		return session.delete(statement, post_vote) > 0;
	}

	@Override
	public int getid() {
		String statement = ns + "nextPostId";
		return session.selectOne(statement);
	}

	
	@Override
	public List<Integer> selectP_idByFilterWithoutFollerings(int listSize, int startList, MyFilter my, Integer m_id){
		String statement = ns + "selectP_idByFilterWithoutFollerings";
		
		
		my.setListSize(listSize);
		my.setStartList((startList-1)*listSize);
		my.setM_id(m_id);
		System.out.println("----my from dao" + my);
		return session.selectList(statement, my);
	}
	
	@Override
	public List<Integer> searchMyFeed(int m_id, int no1, int no2) {
		String statement = ns + "searchMyFeed";
		Map<String, Integer> map = new HashMap<String, Integer>();
		map.put("m_id", m_id);
		map.put("listSize", no1);
		map.put("startList", (no2-1)*no1);
		return session.selectList(statement, map);
	}
	
	@Override
	public List<Integer> searchVolFeed(int v_id, int no1, int no2) {
		String statement = ns + "searchVolFeed";
		Map<String, Integer> map = new HashMap<String, Integer>();
		map.put("v_id", v_id);
		map.put("listSize", no1);
		map.put("startList", (no2-1)*no1);
		return session.selectList(statement, map);
	}
	
	@Override
	public List<Integer> searchMyPosts(int m_id, int no1, int no2) {
		String statement = ns + "searchMyPosts";
		Map<String, Integer> map = new HashMap<String, Integer>();
		map.put("m_id", m_id);
		map.put("listSize", no1);
		map.put("startList", (no2-1)*no1);
		return session.selectList(statement, map);
	}
	
	/*
	@Override
	public int addViewCnt(int no) {
		// TODO Auto-generated method stub

		return session.update(ns + "addViewCnt", no);
	}

	@Override
	public int getViewCnt(int no) {
		// TODO Auto-generated method stub
		return session.selectOne(ns + "getViewCnt", no);
	}

	@Override
	public List<Post> searchByCondition(String condition, String key) {
		// TODO Auto-generated method stub
		HashMap<String, String> map = new HashMap<String, String>();
		key = "%" + key + "%";
		map.put("condition", condition);
		map.put("key", key);
		return session.selectList(ns + "searchByCondition", map);
	}

	
	@Override
	public int getBoardListCnt() {

	
		return session.selectOne(ns + "getBoardListCnt");
	}

	@Override
	public List<Post> searchbypage(Pagination p) {
		
		return session.selectList(ns + "getBoardList",p);
	}
	*/
}