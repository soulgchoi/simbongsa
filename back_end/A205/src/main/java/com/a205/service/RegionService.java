package com.a205.service;

import org.springframework.stereotype.Service;

import com.a205.dto.Region;

public interface RegionService {
	public Region selectOne(String r_sidoCd, String r_gugunCd);
	public Region selectByR_id(Integer r_id);

}
