package com.map.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.map.dao.VolDao;
import com.map.dto.Vol;

@Service
public class VolServiceImpl implements VolService {

	@Autowired
	private VolDao dao;
	
	@Override
	public Vol searchVolDetail(int v_id) {
		return dao.searchVol(v_id);
	}
	
	@Override
	public List<Vol> searchAll(){
		return dao.searchAll();
	}
	
	@Override
	public boolean update(Vol vol) {
		return dao.update(vol);
	}
}
