package com.a205.dao;

import java.util.List;

import com.a205.dto.Comment;
import com.a205.dto.Comment_update;

public interface CommentDAO {

	public List<Comment> searchListComments(int p_id);
	
	public Comment searchOne(int c_id);
	
	public boolean remove(int c_id);

	public boolean update(Comment_update new_comment);

	public boolean add(String p_id, String m_id, String comment);

}

