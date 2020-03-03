package com.a205.dao;

import java.util.List;

import com.a205.dto.Member_has_region;

public interface MemberHasRegionDAO {
	public boolean add(Member_has_region member_has_region);

	public boolean remove(int m_id);

	public List<String> searchByM_id(int m_id);

}
