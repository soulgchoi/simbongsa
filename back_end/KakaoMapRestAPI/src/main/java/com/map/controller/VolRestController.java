package com.map.controller;

import java.util.Arrays;
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

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.map.api.KakaoRestAPI;
import com.map.api.KakaoRestAPIExecutor;
import com.map.dto.Location;
import com.map.dto.Region;
import com.map.dto.Vol;
import com.map.service.VolService;
import com.map.type.KakaoRestAPIType;
import com.map.util.HttpConnectUtil;

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
	
	private String kakaoMap(String regions) {
		String regionName = HttpConnectUtil.encodeString(regions);
        String query = "query=" + regionName;
        Gson gson = new Gson();
            
        KakaoRestAPI api = KakaoRestAPI
                    .builder("af2bbf172ddd207e36c405ff2ecd0f00")
                    .setRestAPIType(KakaoRestAPIType.SearchingByKeword)
                    .setParameter(query)
                    .build();

        KakaoRestAPIExecutor executor = new KakaoRestAPIExecutor(api);
            
        JsonParser parser = new JsonParser();
        JsonElement rootObject = parser.parse(executor.execute()).getAsJsonObject().get("documents");
        String jsonString = rootObject.toString();
        Location[] array = gson.fromJson(jsonString, Location[].class);
        List<Location> list = Arrays.asList(array);
        for(Location l : list) {
            System.out.println(l.getX()+" "+l.getY()+"\n");
        }
        
//        List<Region> list2;
//        for(Region r : list2) {
//            System.out.println(r.getSidoCd()+"\n");
//        }
		return null;
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
