package com.react.dao;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.react.util.MyBatisUtil2;
import com.react.vo.Region;

public class RegDao {
	
	public boolean addReg(Region reg) throws Exception {//모든 직원 정보
		SqlSession session = MyBatisUtil2.getSqlSession();
		session.insert("volunteer.addReg", reg);
		session.commit();
		return true;
	}
	
	public int getRegCd(String sidoCd, String gugunCd) throws Exception {//모든 직원 정보
		SqlSession session = MyBatisUtil2.getSqlSession();
		Map<String, String> map = new HashMap<>();
		
		map.put("sidoCd", sidoCd);
		map.put("gugunCd", gugunCd);
		return session.selectOne("volunteer.getReg", map);
	}
	
}
