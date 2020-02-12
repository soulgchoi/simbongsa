package com.map.dao;

import java.util.List;

import com.map.dto.Region;

public interface RegionDao {
	public Region searchRegion(int r_id);
	public List<Region> searchAll();
}
