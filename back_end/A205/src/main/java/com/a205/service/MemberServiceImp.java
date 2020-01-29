package com.a205.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a205.dao.MemberDAO;
import com.a205.dao.MemberDAOImp;
import com.a205.dto.Member;
import com.a205.dto.MemberException;

@Service
public class MemberServiceImp implements MemberService {
	private static Logger logger = LoggerFactory.getLogger(MemberServiceImp.class);
	
	@Autowired
	private MemberDAO dao;

	@Override
	public Member search(String id) {
		return dao.search(id);
	}

	@Override
	public List<Member> searchAll() {
		return dao.searchAll();
	}

	@Override
	public boolean login(String id, String pw) {
		Member member = dao.search(id);
		if(pw.equals(member.getM_password())) {
			return true;
		}else {
			throw new MemberException("비밀 번호 오류");
		}
	}

	@Override
	public boolean checkID(String id) {
		Member member = dao.search(id);
		if(member == null) {
			return false;
		}else {
			return true;
		}
	}

	@Override
	public boolean update(Member member) {
		return dao.update(member);
	}

	@Override
	public boolean remove(String id) {
		return dao.remove(id);
	}

	@Override
	public boolean add(Member member) {
		return dao.add(member);
	}
}
