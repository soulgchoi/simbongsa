package com.a205.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a205.dao.VolDao;
import com.a205.dto.MyFilter;
import com.a205.dto.Vol;
import com.a205.dto.Vol_Mini;

@Service
public class VolServiceImpl implements VolService {

	@Autowired
	private VolDao dao;

	public List<Vol_Mini> searchVolList(int listSize, int startList) {
		return dao.searchVolPage(listSize, startList);
	}
	
	public Vol searchVolDetail(int v_id) {
		return dao.searchVol(v_id);
	}

	@Override
	public List<Vol> searchByFilter(int listSize, int startList, MyFilter my) {
		return dao.searchByFilter(listSize, startList, my);
	}

}
