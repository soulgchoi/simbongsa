package com.a205.dao;

import java.util.List;

import com.a205.dto.Member_has_region;

public interface MemberHasRegionDAO {
	public boolean add(Member_has_region member_has_region);

	public List<Integer> searchByM_id(Integer m_id);

}
