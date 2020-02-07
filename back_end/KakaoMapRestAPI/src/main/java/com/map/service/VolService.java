package com.map.service;

import java.util.List;

import com.map.dto.Vol;

public interface VolService {
	public Vol searchVolDetail(int v_id);
	public List<Vol> searchAll();
	public boolean update(Vol vol);
}