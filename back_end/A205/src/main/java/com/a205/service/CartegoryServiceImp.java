package com.a205.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.a205.dao.CategoryDAO;
import com.a205.dto.Category;

public class CartegoryServiceImp implements CategoryService{

	@Autowired
	CategoryDAO categoryDao;
	
	public Category selectOne(String ca_highCd, String ca_lowCd) {
		return categoryDao.selectOne(ca_highCd, ca_lowCd);
	}

}
