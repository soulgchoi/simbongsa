package com.map.service;

import java.util.List;

import com.map.dto.Region;

public interface RegionService {
	public Region searchRegion(int r_id);
	public List<Region> searchAll();
}
