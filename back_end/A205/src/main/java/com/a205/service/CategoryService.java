package com.a205.service;

import com.a205.dto.Category;

public interface CategoryService {
	public Category selectOne(String ca_highCd, String ca_lowCd);

}
