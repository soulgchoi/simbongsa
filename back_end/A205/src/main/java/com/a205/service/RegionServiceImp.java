package com.a205.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import com.a205.dao.RegionDAO;
import com.a205.dto.Region;

@Service
// 빈설정이 2개가 되어서 우선순위를 정하기 위해 primary를 씀 하지만 왜 빈이 두개설정 됐는지는 모르겠다.
@Primary
public class RegionServiceImp implements RegionDAO {
	
	@Autowired
	RegionDAO regionDao;
	
	@Override
	public Region selectOne(String r_sidoCd, String r_gugunCd) {
		return regionDao.selectOne(r_sidoCd, r_gugunCd);
	}

	@Override
	public Region selectByR_id(Integer r_id) {
		return regionDao.selectByR_id(r_id);
	}

}
