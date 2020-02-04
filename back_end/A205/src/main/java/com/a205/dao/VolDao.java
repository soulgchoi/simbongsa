package com.a205.dao;

import java.util.List;

import com.a205.dto.Vol;
import com.a205.dto.Vol_Mini;

public interface VolDao {
	public List<Vol_Mini> searchVolPage(int listSize, int startList);
	public Vol searchVol(int v_id);
	public List<Vol> searchAll();
}
