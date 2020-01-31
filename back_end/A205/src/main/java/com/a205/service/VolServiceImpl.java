package com.a205.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a205.dao.VolDao;

@Service
public class VolServiceImpl implements VolService {

	@Autowired
	private VolDao dao;

	public List<String> search(int listSize, int startList) {
		return dao.searchVolPage(listSize, startList);
	}

}
