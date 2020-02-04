package com.detail.crawler;

import java.io.IOException; // 예외 처리 임포트 
import java.util.HashMap;
import java.util.Map;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

// Jsoup 임포트 
public class DetailCrawler {
	// Jsoup은 예외 처리를 해주어야 합니다.
	// 여기서는 getCurrencyRate를 호출한 Caller에서 예외처리를 하도록 throws로 선언합니다.
	public Map<String, String> getCurrencyRate(String url) throws IOException {
		//String URL = url;
		String URL = url;
		Map<String, String> map = new HashMap<>();
		
		Document doc = Jsoup.connect(URL).get();
		// Jsoup을 이용하여, 해당 URL을 get 메소드로 로드하여 Document 변수에 담습니다.
		Element elem = doc.selectFirst("div[class=\"board_data type2\"]");
		
		Elements elems = elem.getElementsByTag("dl");
		
		String[] time = elems.get(1).child(1).text().split("~");
		String bgnTm = time[0].trim().replace("시 ", ":").replace("분", ":00");
		String endTm = time[1].trim().replace("시 ", ":").replace("분", ":00");
		String wanted = elems.get(3).child(1).text();
		String Wkdy = elems.get(4).child(1).text();
		String appnow = elems.get(5).child(1).text().replace(" 명", "");
		String target = elems.get(11).child(1).text();
		
		String detail = doc.selectFirst("div[class=\"bb_txt\"]").child(0).text(); //상세정보
//		System.out.println(elems.toString());
//		System.out.println("*******");
		
		map.put("bgnTm", bgnTm);
		map.put("endTm", endTm);
		map.put("wanted", wanted);
		map.put("Wkdy", Wkdy);
		map.put("appnow", appnow);
		map.put("target", target);
		map.put("detail", detail);
		
//		System.out.println(bgnTm);
//		System.out.println(endTm);
		
		return map;
	}

//	public static void main(String[] args) {
//		String url = "https://www.1365.go.kr/vols/P9210/partcptn/timeCptn.do?type=show&progrmRegistNo=2608554";
//		try {
//			getCurrencyRate(url);
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//	}
}
