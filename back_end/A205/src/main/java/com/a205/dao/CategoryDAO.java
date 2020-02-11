package com.a205.dao;

import java.util.List;

import com.a205.dto.Category;

public interface CategoryDAO {
	public Category selectOne(String ca_highCd, String ca_lowCd);
	public List<Category> selectList(String ca_highNm);
	public List<Category> selectListByHighCd(String ca_highCd);


}
