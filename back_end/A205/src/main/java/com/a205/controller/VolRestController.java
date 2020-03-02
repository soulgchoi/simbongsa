package com.a205.controller;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.a205.dto.MyFilter;
import com.a205.dto.Vol;
import com.a205.dto.Vol_Mini;
import com.a205.service.VolService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/vol")
@CrossOrigin(origins = "*")
public class VolRestController {
	private static final Logger logger = LoggerFactory.getLogger(VolRestController.class);

	@Autowired
	VolService service;

	private ResponseEntity<Map<String, Object>> response(Object data, boolean status, HttpStatus hstatus) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("status", status);
		resultMap.put("data", data);
		return new ResponseEntity<>(resultMap, hstatus);
	}

	@GetMapping("/titles/{no1}/{no2}")
	@ApiOperation("titles / 한페이지 개수(고정해주세요!!) / 페이지 번호")
	public ResponseEntity<Map<String, Object>> getVolList(@PathVariable int no1, @PathVariable int no2) {
		try {
			List<Vol_Mini> a = service.searchVolList(no1, no2);
			return response(a, true, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("제목리스트조회실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}
	
	static SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
	static String format_time = formatter.format(System.currentTimeMillis());
	
	@GetMapping("/titles/{no1}/{no2}/filtering/")
	@ApiOperation("titles / 한페이지 개수 / 페이지 번호 / 검색 필터 값들...")
	public ResponseEntity<Map<String, Object>> getVolListByFilter(@PathVariable int no1, @PathVariable int no2, 
			@RequestParam(value="v_pBgnD", required=false, defaultValue="") String v_pBgnD, 
			@RequestParam(value="m_age", required=false, defaultValue="") String m_age, 
			@RequestParam(value="v_pEndD", required=false, defaultValue="") String v_pEndD,
			@RequestParam(value="v_pstatus", required=false, defaultValue="0") int v_pstatus, // 1= 모집예정, 2=모집중, 3=모집완료
			@RequestParam(value="ca_highNm1", required=false, defaultValue="") String ca_highNm1,
			@RequestParam(value="ca_highNm2", required=false, defaultValue="") String ca_highNm2,
			@RequestParam(value="ca_highNm3", required=false, defaultValue="") String ca_highNm3,
			@RequestParam(value="v_bgnTm", required=false, defaultValue="") String v_bgnTm,
			@RequestParam(value="v_endTm", required=false, defaultValue="") String v_endTm,
			@RequestParam(value="r_sidoNm1", required=false, defaultValue="") String r_sidoNm1,
			@RequestParam(value="r_gugunNm1", required=false, defaultValue="") String r_gugunNm1,
			@RequestParam(value="r_sidoNm2", required=false, defaultValue="") String r_sidoNm2,
			@RequestParam(value="r_gugunNm2", required=false, defaultValue="") String r_gugunNm2,
			@RequestParam(value="r_sidoNm3", required=false, defaultValue="") String r_sidoNm3,
			@RequestParam(value="r_gugunNm3", required=false, defaultValue="") String r_gugunNm3,
			@RequestParam(value="vol_title", required=false, defaultValue="") String vol_title,
			Model model) {
		try {
			MyFilter mf = new MyFilter();
			mf.setM_age(m_age);
			mf.setV_pBgnD(v_pBgnD);
			mf.setV_pEndD(v_pEndD);
			mf.setV_pstatus(v_pstatus);
			mf.setCa_highNm1(ca_highNm1);
			mf.setCa_highNm2(ca_highNm2);
			mf.setCa_highNm3(ca_highNm3);
			mf.setV_bgnTm(v_bgnTm);
			mf.setV_endTm(v_endTm);
			mf.setR_sidoNm1(r_sidoNm1);
			mf.setR_gugunNm1(r_gugunNm1);
			mf.setR_sidoNm2(r_sidoNm2);
			mf.setR_gugunNm2(r_gugunNm2);
			mf.setR_sidoNm3(r_sidoNm3);
			mf.setR_gugunNm3(r_gugunNm3);
			mf.setVol_title(vol_title);
			List<Vol> v = service.searchByFilter(no1, no2, mf);
			return response(v, true, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("제목리스트조회실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}
	
	@GetMapping("/detail/{no}")
	@ApiOperation("detail / titles에서 찾은 v_id(봉사 고유 번호)")
	public ResponseEntity<Map<String, Object>> getVolDetail(@PathVariable int no) {
		try {
			Vol a = service.searchVolDetail(no);
			return response(a, true, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("제목리스트조회실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}
	
}
