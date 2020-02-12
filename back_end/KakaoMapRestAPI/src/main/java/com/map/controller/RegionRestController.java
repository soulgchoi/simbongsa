package com.map.controller;

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

import com.map.dto.Region;
import com.map.service.RegionService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/region")
@CrossOrigin(origins = "*")
public class RegionRestController {
	private static final Logger logger = LoggerFactory.getLogger(VolRestController.class);

	@Autowired
	RegionService service;

	private ResponseEntity<Map<String, Object>> response(Object data, boolean status, HttpStatus hstatus) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("status", status);
		resultMap.put("data", data);
		return new ResponseEntity<>(resultMap, hstatus);
	}

	@GetMapping("/All")
	@ApiOperation("지역의 모든 정보를 반환한다.")
	public ResponseEntity<Map<String, Object>> getVolAll() {
		try {
			List<Region> list = service.searchAll();
			return response(list, true, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("지역리스트조회실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}
	
}
