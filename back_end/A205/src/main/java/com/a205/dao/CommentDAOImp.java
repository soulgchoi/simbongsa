package com.a205.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.a205.dto.Comment;
import com.a205.dto.Comment_special_obj;

@Repository
public class CommentDAOImp implements CommentDAO {

	private final String ns = "com.a205.model.commentmapper.";
	
	@Autowired
	SqlSession session;
	
	@Override
	public boolean add(Integer p_id, Integer m_id, String comment) {
		String statement = ns+ "insert";
		System.out.println("=====dao" + comment);
		
		Comment_special_obj o = new Comment_special_obj();
		
		o.setM_id(m_id);
		o.setC_content(comment);
		o.setP_id(p_id);
		return session.insert(statement, o)>0;
	}
	
	@Override
	public List<Comment> searchListComments(Integer p_id){
		String statement = ns+ "searchListComments";
		return session.selectList(statement, p_id);
	}

	
	@Override
	public Comment searchOne(Integer c_id) {
		String statement = ns+ "searchOne";
		return session.selectOne(statement, c_id);

	}
	
	@Override
	public boolean remove(Integer c_id) {
		String statement = ns+ "delete";
		return session.delete(statement, c_id) >0;

	}
	
	@Override
	public boolean update(Comment new_comment) {
		String statement = ns+ "update";
		return session.update(statement, new_comment)>0;

	}
		
}
