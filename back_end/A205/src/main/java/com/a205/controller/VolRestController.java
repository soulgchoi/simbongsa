package com.a205.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
	
	@GetMapping("/All")
	@ApiOperation("봉사활동의 모든 정보를 반환한다.")
	public ResponseEntity<Map<String, Object>> getVolAll() {
		try {
			List<Vol> list = service.searchAll();
			return response(list, true, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("봉사리스트조회실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}
	
}
