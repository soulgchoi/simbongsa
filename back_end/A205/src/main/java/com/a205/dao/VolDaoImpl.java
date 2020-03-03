package com.a205.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.a205.dto.Category;
import com.a205.dto.Member;
import com.a205.dto.MyFilter;
import com.a205.dto.Vol;
import com.a205.dto.Vol_Mini;

@Repository
public class VolDaoImpl implements VolDao {

	private final static String ns = "com.a205.model.volmapper.";

	@Autowired
	SqlSession session;

	@Autowired
	CategoryDAO categoryDao;
	
	
	public List<Vol_Mini> searchVolPage(int listSize, int startList) {
		String statement = ns + "selectList";
		
		Map<String, Integer> map = new HashMap<>();
		map.put("listSize", listSize);
		map.put("startList", (startList-1)*listSize);
		
		return session.selectList(statement, map);
	}
	
	public Vol searchVol(int v_id) {
		String statement = ns + "selectOne";
		
		return session.selectOne(statement, v_id);
	}

	@Override
	public List<Vol> searchByFilter(int listSize, int startList, MyFilter my) {
		String statement1 = ns + "selectByFilter"; 	//봉사명
		
		MyFilter m = new MyFilter();
		if(my.getM_age().equals("")) {
			m.setM_age(null);
		}else {
			m.setM_age(my.getM_age());
		}
		if(my.getV_pBgnD().equals("")) {
			m.setV_pBgnD(null);
		}else {
			m.setV_pBgnD(my.getV_pBgnD());
		}
		
		if(my.getV_pEndD().equals("")) {
			m.setV_pEndD(null);
		}else {
			m.setV_pEndD(my.getV_pEndD());
		}
		
		m.setV_pstatus(my.getV_pstatus());

		if(my.getV_bgnTm().equals("")) {
			m.setV_bgnTm(null);
		}else {
			m.setV_bgnTm(my.getV_bgnTm());
		}
		
		if(my.getV_endTm().equals("")) {
			m.setV_endTm(null);
		}else {
			m.setV_endTm(my.getV_endTm());
		}
		
		if(my.getR_sidoNm1().equals("")) {
			m.setR_sidoNm1(null);
		}else {
			m.setR_sidoNm1(my.getR_sidoNm1());
			System.out.println(m.getR_sidoNm1());

		}
		if(my.getR_sidoNm2().equals("")) {
			m.setR_sidoNm2(null);
		}else {
			m.setR_sidoNm2(my.getR_sidoNm2());
			System.out.println(m.getR_sidoNm2());

		}
		if(my.getR_sidoNm3().equals("")) {
			System.out.println("---asdif---");
			m.setR_sidoNm3(null);
		}else {
			m.setR_sidoNm3(my.getR_sidoNm3());
			System.out.println(m.getR_sidoNm3());
			System.out.println("---asdelse---");

		}
		
		if(my.getR_gugunNm1().equals("")) {
			m.setR_gugunNm1(null);
		}else {

			m.setR_gugunNm1(my.getR_gugunNm1());
			System.out.println(m.getR_gugunNm1());

		}
		if(my.getR_gugunNm2().equals("")) {
			m.setR_gugunNm2(null);
		}else {

			m.setR_gugunNm2(my.getR_gugunNm2());
			System.out.println(m.getR_gugunNm2());

		}
		if(my.getR_gugunNm3().equals("")) {
			m.setR_gugunNm3(null);
		}else {

			m.setR_gugunNm3(my.getR_gugunNm3());
			System.out.println(m.getR_gugunNm3());

		}
		
		if(my.getVol_title().equals("")) {
			m.setVol_title(null);
		}else {
			m.setVol_title(my.getVol_title());
			System.out.println("---------------title"+my.getVol_title());
		}
		
		m.setListSize(listSize);
		m.setStartList((startList-1)*listSize);	
		System.out.println(my.getCa_highNm1()+"my");
		System.out.println(m.getCa_highNm1()+"m");
		if(my.getCa_highNm1().equals("")) {
			m.setCa_highNm1(null);
		}else {
			m.setCa_highNm1(my.getCa_highNm1());
//			List<Category> ca = categoryDao.selectList(my.getCa_highNm1());
//			
//			System.out.println("------------calist");
//			System.out.println(ca);
//			List<String> ca_Id = new ArrayList<String>();
//
//			for(Category c : ca) {
//				ca_Id.add(c.getCa_id().toString());
//			}			
//			m.setCa_id(ca_Id);
		}
		if(my.getCa_highNm2().equals("")) {
			m.setCa_highNm2(null);
		}else {
			m.setCa_highNm2(my.getCa_highNm2());
//			List<Category> ca = categoryDao.selectList(my.getCa_highNm2());
//			List<String> ca_Id = new ArrayList<String>();
//
//			for(Category c : ca) {
//				ca_Id.add(c.getCa_id().toString());
//			}			
//			m.setCa_id(ca_Id);
		}
		if(my.getCa_highNm3().equals("")) {
			m.setCa_highNm3(null);
		}else {
			m.setCa_highNm3(my.getCa_highNm3());
//			List<Category> ca = categoryDao.selectList(my.getCa_highNm3());
//			List<String> ca_Id = new ArrayList<String>();
//
//			for(Category c : ca) {
//				ca_Id.add(c.getCa_id().toString());
//			}			
//			m.setCa_id(ca_Id);
		}
		
		System.out.println("----------------m--------------"+m);
		
		List<Vol> f1 = session.selectList(statement1, m);
		System.out.println(f1);
		return f1;
	}
}