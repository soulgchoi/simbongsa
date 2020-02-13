package com.a205.dao;

import java.util.List;

import com.a205.dto.Member_has_category;

public interface MemberHasCategoryDAO {
	public boolean add(Member_has_category member_has_category);

	public boolean remove(int m_id);
	
	public List<String> searchByM_id(int m_id);
	
	
}
