package com.map.dao;

import java.util.List;

import com.map.dto.Vol;

public interface VolDao {
	public Vol searchVol(int v_id);
	public List<Vol> searchAll();
	public boolean update(Vol vol);
}
