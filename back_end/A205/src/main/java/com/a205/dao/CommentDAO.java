package com.a205.dao;

import java.util.List;

import com.a205.dto.Comment;

public interface CommentDAO {

	public List<Comment> searchListComments(Integer p_id);
	
	public Comment searchOne(Integer c_id);
	
	public boolean add(Integer p_id, Integer m_id, String comment);

	public boolean remove(Integer c_id);

	public boolean update(Comment new_comment);

}

