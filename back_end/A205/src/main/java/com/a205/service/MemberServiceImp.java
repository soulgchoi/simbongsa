package com.a205.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.a205.dao.CategoryDAO;
import com.a205.dao.MemberDAO;
import com.a205.dao.MemberHasCategoryDAO;
import com.a205.dao.MemberHasRegionDAO;
import com.a205.dao.RegionDAO;
import com.a205.dto.Category;
import com.a205.dto.Member;
import com.a205.dto.MemberException;
import com.a205.dto.Member_detail;
import com.a205.dto.Member_has_category;
import com.a205.dto.Member_has_region;
import com.a205.dto.Post;
import com.a205.dto.Vol;
import com.a205.model.MemberPatchRequest;

@Service
public class MemberServiceImp implements MemberService {
	private static Logger logger = LoggerFactory.getLogger(MemberServiceImp.class);

	@Autowired
	private MemberDAO dao;

	@Autowired
	private RegionDAO regionDao;

	@Autowired
	private PasswordEncoder bcryptEncoder;
	
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
		if (pw.equals(member.getM_password())) {
			return true;
		} else {
			throw new MemberException("비밀 번호 오류");
		}
	}

	@Override
	public Member selectByM_id(Integer m_id) {
		return dao.selectByM_id(m_id);
	}

	
	@Override
	public boolean checkID(String id) {
		Member member = dao.search(id);
		if (member == null) {
			return false;
		} else {
			return true;
		}
	}

	@Override
	public boolean checkEmail(String email) {
		Member member = dao.searchByEmail(email);
		if (member == null) {
			return false;
		} else {
			return true;
		}
	}

	@Override
	@Transactional
	public boolean patchUpdate(String userId, MemberPatchRequest memberPatch) {
		try {
			Member member = dao.search(userId);
			int m_id = member.getM_id();
			String m_age = memberPatch.getM_age();
			System.out.println(m_age);
			String m_bgnTm = memberPatch.getM_bgnTm();
			String m_endTm = memberPatch.getM_endTm();
			if (m_age.equals("")) {
				m_age = null;
			}
			if (m_bgnTm.equals("")) {
				m_bgnTm = null;
			}
			if (m_endTm.equals("")) {
				m_endTm = null;
			}
			member.setM_age(m_age);
			member.setM_bgnTm(m_bgnTm);
			member.setM_endTm(m_endTm);

			// 선호 지역 설정
			List<String> prefer_region = memberPatch.getPrefer_region();
			
			Member_has_region member_has_region = new Member_has_region();
			// 만약 새로 받은 정보가 있다면 수정, 아니면 그대로 냅둬라
//			System.out.println(prefer_region);
			// 널이 아니면
			/*
			 * if (prefer_region!=null && !prefer_region.isEmpty()) { // 기존 선호 지역 삭제
			 * List<String> list_of_member_has_regions_id =
			 * member_has_region_dao.searchByM_id(m_id); if
			 * (list_of_member_has_regions_id.size() > 0) {
			 * System.out.println(list_of_member_has_regions_id); for(String
			 * r_id:list_of_member_has_regions_id) { Member_has_region member_has_region =
			 * new Member_has_region(); member_has_region.setM_id(m_id);
			 * member_has_region.setR_id(r_id);
			 * 
			 * boolean member_has_region_deleted =
			 * member_has_region_dao.remove(member_has_region); System.out.println("지워졌니?");
			 * System.out.println(member_has_region_deleted); } } List<String> list =
			 * java.util.Arrays.asList(prefer_region.split(" ")); for(String r_id:list) {
			 * Member_has_region member_has_region = new Member_has_region();
			 * member_has_region.setM_id(m_id); Integer r_id1 = Integer.parseInt(r_id);
			 * member_has_region.setR_id(r_id1); boolean member_has_region_created =
			 * member_has_region_dao.add(member_has_region);
			 * System.out.println(member_has_region_created); } }
			 */
			member_has_region_dao.remove(m_id);
			for (String region : prefer_region) {
				member_has_region.setM_id(m_id);
				member_has_region.setR_id(region);
				member_has_region_dao.add(member_has_region);
			}

			/////////////////////////////////

			// 선호 봉사 정보 수정
			List<String> prefer_category = memberPatch.getPrefer_category();
			
			Member_has_category member_has_category = new Member_has_category();
			// 만약 새로 받은 정보가 있다면 수정, 아니면 그대로 냅둬라
			/*
			 * if (prefer_category!=null && !prefer_category.isEmpty()) { // 기존 선호 카테고리 삭제
			 * List<String>list_of_member_has_categories_id =
			 * member_has_category_dao.searchByM_id(m_id); if
			 * (list_of_member_has_categories_id.size() > 0) {
			 * 
			 * System.out.println(list_of_member_has_categories_id); for(Integer
			 * ca_id:list_of_member_has_categories_id) { Member_has_category
			 * member_has_category = new Member_has_category();
			 * member_has_category.setM_id(m_id); member_has_category.setCa_id(ca_id);
			 * 
			 * member_has_category_dao.remove(member_has_category); } } // 새로운 선호 카테고리 생성
			 * List<String> list2 = java.util.Arrays.asList(prefer_category.split(" "));
			 * for(String ca_highCd:list2) {
			 * System.out.println("---------------"+ca_highCd); List<Category>
			 * categories_selected_by_highCd = categoryDao.selectListByHighCd(ca_highCd);
			 * for(Category cate:categories_selected_by_highCd) { Member_has_category
			 * member_has_category = new Member_has_category();
			 * 
			 * Integer ca_id = cate.getCa_id(); member_has_category.setM_id(m_id);
			 * 
			 * member_has_category.setCa_id(ca_id); boolean member_has_category_created =
			 * member_has_category_dao.add(member_has_category);
			 * System.out.println(member_has_category_created); } } }
			 */
			member_has_category_dao.remove(m_id);
			for (String category : prefer_category) {
				member_has_category.setM_id(m_id);
				List<Category> c = categoryDao.selectListByHighCd(category);
				for(Category cat2 : c) {
					member_has_category.setCa_id(cat2.getCa_id().toString());
					member_has_category_dao.add(member_has_category);
				}
			}

			boolean MemberChangedOk = dao.update(member);

			return MemberChangedOk;

		} catch (Exception e) {
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
		int m_id = member.getM_id();
		List<String> m_prefer_category = member_has_category_dao.searchByM_id(m_id);
		List<String> m_prefer_region = member_has_region_dao.searchByM_id(m_id);

		Member_detail member_detail = new Member_detail();
		member_detail.setM_address(member.getM_address());
		member_detail.setM_age(member.getM_age());
		member_detail.setM_bgnTm(member.getM_bgnTm());
		member_detail.setM_email(member.getM_email());
		member_detail.setM_endTm(member.getM_endTm());
		member_detail.setM_id(m_id);
		member_detail.setM_userid(member.getM_userid());
		member_detail.setM_prefer_category(m_prefer_category);
		member_detail.setM_prefer_region(m_prefer_region);

		return member_detail;
	}

	@Override
	public List<Post> searchPost(String userId) {
		Integer m_id = dao.search(userId).getM_id();
		return dao.searchPost(m_id);
	}
	@Override
	public List<Vol> searchVote(String userId){
		int m_id = dao.search(userId).getM_id(); 
		return dao.searchVote(m_id);
	}


	@Override
	public boolean alter_userPassword(String m_email, String m_password) {
		String m_password2 = bcryptEncoder.encode(m_password);
		System.out.println(m_password2);
		return dao.alter_userPassword(m_email, m_password2);
	}
}
