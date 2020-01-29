package com.a205.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a205.dto.Post;
import com.a205.dto.Pagination;
import com.a205.dao.PostDao;

@Service
public class PostServiceImpl implements PostService {

	@Autowired
	private PostDao dao;

	@Override
	public Post search(int no) {
		return dao.search(no);
	}

	@Override
	public List<Post> searchAll() {
		return dao.searchAll();
	}

	@Override
	public boolean update(Post Post) {
		return dao.update(Post);
	}

	@Override
	public boolean remove(int no) {
		return dao.remove(no);
	}

	@Override
	public boolean add(Post Post) {
		return dao.add(Post);
	}

	@Override
	public Integer addViewCnt(Integer no) {
		

		return dao.addViewCnt(no);
	}

	@Override
	public Integer getViewCnt(Integer no) {
		
		return dao.getViewCnt(no);
	}

	@Override
	public List<Post> searchByCondition(String condition, String key) {
		
		return dao.searchByCondition(condition, key);
	}

	@Override
	public Integer getTotalPostListCnt() {
		
		return dao.getBoardListCnt();
	}

	@Override
	public List<Post> getPostpage(Pagination p) {
	
		return dao.searchbypage(p);
	}
}
