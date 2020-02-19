package com.a205.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.a205.dto.Comment;
import com.a205.dto.Comment_update;

@Repository
public class CommentDAOImp implements CommentDAO {

	private final String ns = "com.a205.model.commentmapper.";
	
	@Autowired
	SqlSession session;
	
	@Override
	public boolean add(String p_id, String m_id, String c_content) {
		String statement = ns+ "insert";
		
		Map<String, String> map = new HashMap<>();
		
		map.put("m_id", m_id);
		map.put("p_id", p_id);
		map.put("c_content", c_content);
		
		return session.insert(statement, map)>0;
	}
	
	@Override
	public List<Comment> searchListComments(int p_id){
		String statement = ns+ "searchListComments";
		return session.selectList(statement, p_id);
	}

	@Override
	public Comment searchOne(int c_id) {
		String statement = ns+ "searchOne";
		return session.selectOne(statement, c_id);
	}
	
	@Override
	public boolean remove(int c_id) {
		String statement = ns+ "delete";
		return session.delete(statement, c_id) >0;
	}
	
	@Override
	public boolean update(Comment_update new_comment) {
		String statement = ns+ "update";
		return session.update(statement, new_comment)>0;
	}
		
}
