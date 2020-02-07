package com.a205.dao;

import com.a205.dto.Category;

public interface CategoryDAO {
	public Category selectOne(String ca_highCd, String ca_lowCd);

}
