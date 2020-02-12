package com.map.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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
import com.map.dto.Regex;
import com.map.dto.Region;
import com.map.dto.Vol;
import com.map.service.RegionService;
import com.map.service.VolService;
import com.map.type.KakaoRestAPIType;
import com.map.util.HttpConnectUtil;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/kakao")
@CrossOrigin(origins = "*")
public class KakaoMapRestController {
	private static final Logger logger = LoggerFactory.getLogger(VolRestController.class);

	@Autowired
	VolService volService;

	@Autowired
	RegionService regionService;
	
	public String splitBig() {
		return null;
	}
	
	private ResponseEntity<Map<String, Object>> response(Object data, boolean status, HttpStatus hstatus) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("status", status);
		resultMap.put("data", data);
		return new ResponseEntity<>(resultMap, hstatus);
	}
	
	//키워드를 통한 검색으로 찾아낸 값 중 가장 앞의 값 하나만 추출
	private Location kakaoMap(String regions) {
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
        Location dst = new Location();
        boolean check2= false;
        if(list.size()!=0) {
        	dst = list.get(0);
        	check2=true;
        }
        if(check2) return dst;
        else return null;
	}
	
	@GetMapping("/find")
	@ApiOperation("주소 정보를 반환한다.")
	public ResponseEntity<Map<String, Object>> getVol() {
		try {
			List<Vol> listVol = volService.searchAll();
			List<String> list = new ArrayList<String>();
			for(Vol v : listVol) {
				Region region = regionService.searchRegion(v.getR_id());
				String reg = region.getR_sidoNm()+" "+region.getR_gugunNm();
				String loca = v.getV_location();		
				list.add(reg+" "+loca);
			}
			return response(list, true, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("주소리스트조회실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}
	@GetMapping("/find/{map}")
	@ApiOperation("주소 정보를 반환한다.")
	public ResponseEntity<Map<String, Object>> getVol2(@PathVariable String map) {
		try {
			Location loc = kakaoMap(map);
			return response(loc, true, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("주소리스트조회실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}
	@GetMapping("/find4")
	@ApiOperation("주소 정보를 반환한다.")
	public ResponseEntity<Map<String, Object>> getVol_detail() {
		try {
			//봉사활동 모든 정보 가져오기
			List<Vol> listVol = volService.searchAll();
			
			List<Location> list = new ArrayList<>();
//			List<String> list = new ArrayList<String>();
			
			String address=null;
			for(Vol v : listVol) {
				Region region = regionService.searchRegion(v.getR_id());
				address = v.getV_location();
				if(!address.contains(region.getR_gugunNm())) address = region.getR_gugunNm()+" "+address;
				if(!address.contains(region.getR_sidoNm())) address = region.getR_sidoNm()+" "+address;
				
//				Location loca = kakaoMap(address);
				
				list.add(kakaoMap("보령시자원봉사센터"));
		
			}
			return response(list, true, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("주소리스트조회실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}
	
	@GetMapping("/findNow")
	@ApiOperation("주소 정보를 반환한다.")
	public ResponseEntity<Map<String, Object>> getVol_detailnow() {
		try {
			//봉사활동 모든 정보 가져오기
			List<Vol> listVol = volService.searchAll();
			
//			List<String> list = new ArrayList<>();
			List<Regex> list = new ArrayList<Regex>();
			
			String address;
			String origin;
			String normal;
			String inner;
			String inner2;
			String temp2;
			List<Location> llist = new ArrayList<Location>();
			for(Vol v : listVol) {
				address="";
				origin="";
				normal="";
				inner="";
				inner2="";
				temp2="";
				
				Region region = regionService.searchRegion(v.getR_id());
				address = v.getV_location();
				if(!address.contains(region.getR_gugunNm())) address = region.getR_gugunNm()+" "+address;
				if(!address.contains(region.getR_sidoNm())) address = region.getR_sidoNm()+" "+address;
				
				address=address.replace("★", "");
				if(address.contains(",")) address = address.substring(0, address.lastIndexOf(","));
				if(address.contains(",")) address = address.substring(0, address.lastIndexOf(","));
				if(address.contains(",")) address = address.substring(0, address.lastIndexOf(","));
				
				origin = address;
				
				//문자열 뜯어내기(Outside)
				if(origin.contains("[")) {
					normal = origin.substring(0, origin.lastIndexOf("["));
				}else {
					normal = origin;
				}
				if(origin.contains("(")) {
					normal = origin.substring(0, origin.lastIndexOf("("));
					if(origin.contains(")")) normal+= origin.substring(origin.lastIndexOf(")")+1, origin.length());
				}
				if(normal.contains("(")) {
					normal = normal.substring(0, normal.lastIndexOf("("));
				    if(normal.contains(")")) normal+= normal.substring(normal.lastIndexOf(")")+1, normal.length());
				}
				
				//문자열 뜯어내기(Inside)
				if(origin.contains("(")) {
					inner = origin.substring(origin.lastIndexOf("(")+1);
					if(inner.contains(")")) {
						inner=inner.substring(0, inner.lastIndexOf(")"));
					}
					if(inner.contains(",")) inner = inner.substring(0, inner.lastIndexOf(","));
				}else {
					inner = "";
				}
				

				//문자열 뜯어내기(Inside 대괄호)
				if(origin.contains("[")) {
					inner2 = origin.substring(origin.lastIndexOf("[")+1);
					if(inner2.contains("]")) {
						inner2=inner2.substring(0, inner2.lastIndexOf("]"));
					}
					if(inner2.contains(",")) inner2 = inner2.substring(0, inner2.lastIndexOf(","));
				}else {
					inner2 = "";
				}
				//

				if(normal.contains("[")) {
					normal = normal.substring(0, normal.lastIndexOf("["))+normal.substring(origin.lastIndexOf("]")+1, normal.length());
				}
				
				normal=normal.replace(":", "").replace("사)", "").replace("*", "").replace(".", "");
				if(normal.contains("/")) normal = normal.substring(0, normal.lastIndexOf("/"));
				inner = inner.replace(":", "");
				inner = inner.replace("7층", "").replace("어린이집", "").replace("집결", "").replace(".", "").replace("당리동", "")
						.replace(")", "").replace("중동", "").replace("/", "").replace("1층", "").replace("사무실", "")
						.replace("지부사무실", "").replace("503호~509호", "").replace("상행선", "").replace("자양동", "").replace("정신보건팀", "")
						.replace("사", "").replace("동호동", "").replace("홈플러스 뒤편", "").replace("무실동", "").replace("내동", "").replace("  ", "")
						.replace("삼성동", "").replace("기관", "").replace("무실동", "").replace("2월 8일", "").replace("행궁점", "").replace("무실동", "")
						.replace("파장동", "").replace("매장", "").replace("2층", "").replace("네네치킨", "").replace("용인 인근", "").replace("4층", "")
						.replace("3층", "").replace("하대동", "").replace("지부", "").replace("장소", "").replace("신월동", "").replace("청운동", "")
						.replace("추후공지예정", "").replace("SNS", "").replace("화도-마석", "").replace("재택", "").replace("성석동", "").replace("금정동", "")
						.replace("협회 대표번호", "").replace("5층", "").replace("대림대학교 건너편", "").replace("주", "").replace("2관 4층", "").replace("지하", "")
						.replace("샘", "").replace("해운대구", "").replace("종합자료실", "").replace("서정동", "").replace("봉암리", "").replace("금곡동", "")
						.replace("로비 등", "").replace("실 내외", "").replace("광명동", "").replace("문예동", "").replace("출구밖 아님", "").replace("학교주변 및 우범지역", "")
						.replace("복지시설", "").replace("광광역시", "").replace("소 새롬로", "새롬로").replace("에 방이샤브샤브 음식점 있음", "").replace("정관읍행정복지센터 건너편", "")
						.replace("2관", "").replace("칠금동", "").replace("영운동", "").replace("E30", "").replace("경로식당", "").replace("충북대 부근", "")
						.replace("학교변 및 우범지역", "").replace("이예정", "").replace("교육실", "").replace("진산과학고등학교 맞은편", "").replace("앞", "").replace("사)", "");
				if(inner.equals("주")) inner="";
				if(inner.equals("상동")) inner="";
				
				
				inner2 = inner2.replace(":", "").replace("집결장소", "");
				Regex reg = new Regex();
				reg.setMid(address);
				reg.setNormal(normal);
				reg.setBig(inner2);
				reg.setSmall(inner);
				
				String[] nor = normal.split(" ");
				
				System.out.println("원본: "+address);
				boolean check=false;
				//1순위 대괄호
				if(!inner2.equals("")&&!inner2.equals(" ")) {
					if(kakaoMap(inner2)!=null) {
						System.out.println("대 "+kakaoMap(inner2).getX());
						llist.add(kakaoMap(inner2));
						Location flocation = kakaoMap(inner2);
						v.setV_x(flocation.getX());
						v.setV_y(flocation.getY());
						System.out.println("대형: "+inner2+" "+check+" "+v.getV_x()+" "+v.getV_y());
//						
						volService.update(v);
						
						check=true;
						continue;
					}
				}
				
				check=false;
				//2순위 소괄호
				if(!inner.equals("")) {
					if(kakaoMap(inner)!=null) {
						check=true;
						llist.add(kakaoMap(inner));
						Location flocation = kakaoMap(inner);
						v.setV_x(flocation.getX());
						v.setV_y(flocation.getY());
						System.out.println("소형: "+inner+" "+check+" "+v.getV_x()+" "+v.getV_y()+" "+flocation.getAddress_name());
//						
						volService.update(v);
						continue;
					}
				}
				
				check=false;
				//3순위 노멀
				if(!normal.equals("")) {
					String s1="";
					for(String s : nor) {
						s1+=s+" ";
					}
					if(s1.charAt(0)==' ') s1 = s1.substring(1);
					int size = nor.length;
					while(size>=1) {
						System.out.println("일반: "+s1+" "+check+" "+size);
						
						if(kakaoMap(s1)!=null) {
							check=true;
							llist.add(kakaoMap(s1));
							Location flocation = kakaoMap(s1);
							v.setV_x(flocation.getX());
							v.setV_y(flocation.getY());
							System.out.println("일 "+ s1+" "+check+" "+v.getV_x()+" "+v.getV_y());
//							
							volService.update(v);
							break;
						}
						
						s1="";
						int time = size;
						for(String s : nor) {
							s1 += s+" ";
							if(time==1) break;
							time--;
						}
						size--;
					}
				}
				System.out.println("--------------------------------------------------------");
				
			}
			return response(llist, true, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("주소리스트조회실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}
	
}
