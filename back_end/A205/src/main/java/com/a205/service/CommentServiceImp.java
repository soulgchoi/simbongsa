package com.a205.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a205.dao.CommentDAO;
import com.a205.dto.Comment;
import com.a205.dto.Comment_update;

@Service
public class CommentServiceImp implements CommentService{

	@Autowired
	private CommentDAO commentDao;
	
	@Override
	public boolean add(String p_id, String m_id, String comment) {
//		System.out.println("-------"+p_id +m_id +comment);
		return commentDao.add(p_id, m_id, comment);
	}
	
	@Override
	public boolean remove(int c_id) {
		return commentDao.remove(c_id);
	}
	
	@Override
	public List<Comment> searchListComments(int p_id) {
		return commentDao.searchListComments(p_id);
	}
	
	@Override
	public Comment searchOne(int c_id) {
		return commentDao.searchOne(c_id);
	}
	
	@Override
	public boolean update(Comment_update new_comment) {
		return commentDao.update(new_comment);
	}

}
