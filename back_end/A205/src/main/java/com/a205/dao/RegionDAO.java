package com.a205.dao;

import com.a205.dto.Region;

public interface RegionDAO {
	
	public Region selectOne(String r_sidoCd, String r_gugunCd);

	public Region selectByR_id(Integer r_id);

}
