package com.react.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.react.util.MyBatisUtil2;
import com.react.vo.Post;

public class PostDao {
	
	public boolean addPost(Post post) throws Exception {
		SqlSession session = MyBatisUtil2.getSqlSession();
		session.insert("volunteer.addReg", post);
		session.commit();
		return true;
	}

}