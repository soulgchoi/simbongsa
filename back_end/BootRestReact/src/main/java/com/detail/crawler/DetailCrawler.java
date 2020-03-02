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
	public Map<String, String> getCurrencyRate(String url) throws IOException { // 스태틱 아니어야 함
		Map<String, String> map = new HashMap<>();
		try {
			Document doc = Jsoup.connect(url).get();
			Element elem = doc.selectFirst("div[class=\"board_data type2\"]");

			Elements elems = elem.getElementsByTag("dl");

			String[] time = elems.get(1).child(1).text().split("~");
			String bgnTm = time[0].trim().replace("시 ", ":").replace("분", ":00");
			String endTm = time[1].trim().replace("시 ", ":").replace("분", ":00");
			// String wanted = elems.get(3).child(1).text().replace(" 명 / 일, "");
			// String Wkdy = elems.get(4).child(1).text();
			String appnow = elems.get(5).child(1).text().replace(" 명", "");
			String target = elems.get(11).child(1).text();

//		Element image = elems.get(12).child(1).child(0); //첨부파일
//		
//		String imageurl = "https://www.1365.go.kr" + image.attr("href");

			// String detail =
			// doc.selectFirst("div[class=\"bb_txt\"]").tagName("pre").text();

			map.put("bgnTm", bgnTm);
			map.put("endTm", endTm);
			// map.put("wanted", wanted);
			// map.put("Wkdy", Wkdy);
			map.put("appnow", appnow);
			map.put("target", target);
			// map.put("detail", detail);

//		System.out.println(imageurl);
//		System.out.println(map.toString());
		} finally {

		}
		return map;
	}

//	public static void main(String[] args) {
//		String url = "https://1365.go.kr/vols/P9210/partcptn/timeCptn.do?type=show&progrmRegistNo=2609218";
//		try {
//			getCurrencyRate(url);
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//	}
}
