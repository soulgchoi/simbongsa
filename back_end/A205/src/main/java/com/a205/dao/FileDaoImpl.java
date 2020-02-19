package com.a205.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.a205.dto.UploadFile;

@Repository
public class FileDaoImpl implements FileDao {
	private final String ns = "com.a205.model.filemapper.";

	@Autowired
	SqlSession session;

//	@Override
//	public Iterable<UploadFile> findAll() {
//		return null;
//	}

	@Override
	public List<String> findById(int p_id) {
		String statement = ns+ "selectFileList";
		return session.selectList(statement, p_id);
	}
	
	@Override
	public String findByM_Id(int m_id) {
		String statement = ns+ "selectProfile";
		String profile = null;
		try {
		profile = session.selectOne(statement, m_id);
		} finally {
			//없음
		}
		return profile;
	}

	@Override
	public void insertFile(Map<String, Object> map) {
		String statement = ns+ "insertFile";
		//return session.insert(statement, map) > 0;
		session.insert(statement, map);
	}

	@Override
	public void insertProfile(Map<String, Object> map) {
		String statement = ns+ "insertProfile";
		//return session.insert(statement, map) > 0;
		session.insert(statement, map);
	}

	@Override
	public void deleteProFile(int m_id) {
		String statement = ns+ "deleteProfile";
		//return session.insert(statement, map) > 0;
		session.delete(statement, m_id);
	}

}
