package com.map.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.map.dao.RegionDao;
import com.map.dto.Region;

@Service
public class RegionServiceimpl implements RegionService {

	@Autowired
	private RegionDao dao;
	
	@Override
	public Region searchRegion(int r_id) {
		return dao.searchRegion(r_id);
	}

	@Override
	public List<Region> searchAll() {
		return dao.searchAll();
	}
}
