package com.a205.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.a205.dao.CategoryDAO;
import com.a205.dto.Category;

public class CartegoryServiceImp implements CategoryService{

	@Autowired
	CategoryDAO categoryDao;
	
	public Category selectOne(String ca_highCd, String ca_lowCd) {
		return categoryDao.selectOne(ca_highCd, ca_lowCd);
	}

	@Override
	public List<Category> selectList(String ca_highNm) {
		return categoryDao.selectList(ca_highNm);
	}

}
