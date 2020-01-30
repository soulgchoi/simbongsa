package com.a205.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a205.dao.VolDaoImpl;
import com.a205.dto.Post;

@Service
public class VolServiceImpl {

	@Autowired
	private VolDaoImpl dao;

	public List<String> search(int listSize, int startList) {
		return dao.searchVolPage(listSize, startList);
	}

}
