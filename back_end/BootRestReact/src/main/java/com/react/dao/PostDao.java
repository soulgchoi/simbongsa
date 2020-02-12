package com.react.dao;

import org.apache.ibatis.session.SqlSession;

import com.react.util.MyBatisUtil2;
import com.react.vo.Post;

public class PostDao {
	
	public void addPost(Post post) throws Exception {
		SqlSession session = MyBatisUtil2.getSqlSession();
		session.insert("volunteer.addPost", post);
		session.commit();
		//return true;
	}

	public static void addOrig(int i) {
		try {
		SqlSession session = MyBatisUtil2.getSqlSession();
		session.insert("volunteer.addOrig", i);
		session.commit();
		//return true;
		} finally {
			
		}
	}

}