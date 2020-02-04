package com.a205.service;

import java.util.List;

import com.a205.dto.Vol;
import com.a205.dto.Vol_Mini;

public interface VolService {
	public List<Vol_Mini> searchVolList(int listSize, int startList);
	public Vol searchVolDetail(int v_id);
	public List<Vol> searchAll();
}