package com.a205.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.a205.dao.RegionDAO;
import com.a205.dto.Region;

public class RegionServiceImp implements RegionDAO {
	
	@Autowired
	RegionDAO regionDao;
	
	public Region selectOne(String r_sidoCd, String r_gugunCd) {
		return regionDao.selectOne(r_sidoCd, r_gugunCd);
	}

}
