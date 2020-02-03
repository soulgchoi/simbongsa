package com.react.dao;

import org.apache.ibatis.session.SqlSession;

import com.react.util.MyBatisUtil2;
import com.react.vo.Vol;

public class VolDao {
	
	public void addVol(Vol vol) throws Exception {//모든 직원 정보
		SqlSession session = MyBatisUtil2.getSqlSession();
		session.insert("volunteer.addVol", vol);
		session.commit();
		//return true;
	}

}
