package com.a205.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a205.dao.CommentDAO;
import com.a205.dto.Comment;

@Service
public class CommentServiceImp implements CommentService{
	private static Logger Logger = LoggerFactory.getLogger(CommentServiceImp.class);

	@Autowired
	private CommentDAO commentDao;
	
	@Override
	public boolean add(Integer p_id, Integer m_id, String comment) {
		return commentDao.add(p_id, m_id, comment);
	}
	
	@Override
	public boolean remove(Integer c_id) {
		return commentDao.remove(c_id);
	}
	
	@Override
	public List<Comment> searchListComments(Integer p_id) {
		return commentDao.searchListComments(p_id);
	}
	
	@Override
	public Comment searchOne(Integer c_id) {
		return commentDao.searchOne(c_id);
	}
	
	@Override
	public boolean update(Comment new_comment) {
		return commentDao.update(new_comment);
	}

}
