package com.a205.dao;

import java.util.List;

import com.a205.dto.Member_has_category;

public interface MemberHasCategoryDAO {
	public boolean add(Member_has_category member_has_category);

	public boolean remove(Member_has_category member_has_category);
	
	public List<Member_has_category> searchByM_id(Integer m_id);
	
	
}
