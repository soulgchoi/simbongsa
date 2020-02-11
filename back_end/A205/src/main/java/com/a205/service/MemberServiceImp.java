package com.a205.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.a205.dao.CategoryDAO;
import com.a205.dao.MemberDAO;
import com.a205.dao.MemberDAOImp;
import com.a205.dao.MemberHasCategoryDAO;
import com.a205.dao.MemberHasRegionDAO;
import com.a205.dao.RegionDAO;
import com.a205.dto.Category;
import com.a205.dto.Member;
import com.a205.dto.Region;
import com.a205.dto.MemberException;
import com.a205.dto.Member_detail;
import com.a205.dto.Member_has_category;
import com.a205.dto.Member_has_region;
import com.a205.dto.Post;
import com.a205.model.MemberPatchRequest;

import io.jsonwebtoken.lang.Arrays;

@Service
public class MemberServiceImp implements MemberService {
	private static Logger logger = LoggerFactory.getLogger(MemberServiceImp.class);
	
	@Autowired
	private MemberDAO dao;
	
	@Autowired
	private RegionDAO regionDao;
	
	@Autowired
	private CategoryDAO categoryDao;
	
	@Autowired
	private MemberHasCategoryDAO member_has_category_dao;
	
	@Autowired
	private MemberHasRegionDAO member_has_region_dao;

	@Override
	public Member search(String userId) {
		return dao.search(userId);
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
	public boolean checkEmail(String email) {
		Member member = dao.searchByEmail(email);
		if(member == null) {
			return false;
		}else {
			return true;
		}
	}
	@Override
	@Transactional
	public boolean patchUpdate(String userId,MemberPatchRequest memberPatch) {
		try {
			Member member = dao.search(userId);
			Integer m_id = member.getM_id();
			String m_age = memberPatch.getM_age();
			String m_bgnTm = memberPatch.getM_bgnTm();
			String m_endTm = memberPatch.getM_endTm();
			// 선호 지역 설정
			String perfer_region = memberPatch.getPrefer_region();
			List<String> list = java.util.Arrays.asList(perfer_region.split(" "));
			for(String r_id:list) {
				Member_has_region  member_has_region = new Member_has_region();
				member_has_region.setM_id(m_id);
				Integer r_id1 = Integer.parseInt(r_id);
				member_has_region.setR_id(r_id1);
				boolean member_has_region_created = member_has_region_dao.add(member_has_region);
				System.out.println(member_has_region_created);
			}		
			
			String perfer_category = memberPatch.getPrefer_category();
			List<String> list2 = java.util.Arrays.asList(perfer_category.split(" "));
			for(String ca_highCd:list2) {
				Member_has_category member_has_category = new Member_has_category();
				member_has_category.setM_id(m_id);
				// r_sidoCd
				List<Category> category_selected_by_highCd = categoryDao.selectListByHigiCd(ca_highCd);				// r_gugunCd
				for(Category cate:category_selected_by_highCd) {
					Integer ca_id = cate.getCa_id();
					member_has_category.setCa_id(ca_id);
					boolean member_has_category_created = member_has_category_dao.add(member_has_category);
					System.out.println(member_has_category_created);
				}
			}		

			member.setM_age(m_age); 
			member.setM_bgnTm(m_bgnTm);
			member.setM_endTm(m_endTm);
			
			boolean MemberChangedOk = dao.update(member);
			
			
			return MemberChangedOk;


		} catch (Exception e){
			e.printStackTrace();
		}
		return false;
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

	@Override
	@Transactional
	public Member_detail searchDetail(String userId) {
		
		Member member = dao.search(userId);
		Integer m_id = member.getM_id();
		List<Member_has_category> m_prefer_category = member_has_category_dao.searchByM_id(m_id);
		List<Member_has_region> m_prefer_region = member_has_region_dao.searchByM_id(m_id);
		
		
		Member_detail member_detail = new Member_detail();
		member_detail.setM_address(member.getM_address());
		member_detail.setM_age(member.getM_age());
		member_detail.setM_bgnTm(member.getM_bgnTm());
		member_detail.setM_email(member.getM_email());
		member_detail.setM_endTm(member.getM_endTm());
		member_detail.setM_id(m_id);
		member_detail.setM_password(member.getM_password());
		member_detail.setM_userid(member.getM_userid());
		member_detail.setM_prefer_category(m_prefer_category);
		member_detail.setM_prefer_region(m_prefer_region);
		
		return member_detail;
	}

	@Override
	public List<Post> searchPost(String userId){
		Integer m_id = dao.search(userId).getM_id(); 
		return dao.searchPost(m_id);
	}

}
