package com.detail.crawler;

import java.io.IOException; // 예외 처리 임포트 
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

// Jsoup 임포트 
public class DetailCrawler {
	// Jsoup은 예외 처리를 해주어야 합니다.
	// 여기서는 getCurrencyRate를 호출한 Caller에서 예외처리를 하도록 throws로 선언합니다.
	public static String getCurrencyRate(String url) throws IOException {
		//String URL = url;
		String URL = url;
		
		Document doc = Jsoup.connect(URL).get();
		// Jsoup을 이용하여, 해당 URL을 get 메소드로 로드하여 Document 변수에 담습니다.
		Elements elem = doc.select("div[class=\"board_data type2\"]");
		// 얻어진 Document에서 Span중 data-reactid 어트리뷰트가 35인 것을 찾습니다.
		//String str = elem.text();
		// 찾아진 엘리먼트(태그)들의 값을 Text로 출력합니다.
		//System.out.println(elem);
		System.out.println(elem.toString());
		return elem.toString();
	}

	public static void main(String[] args) {
		String url = "https://1365.go.kr/vols/P9210/partcptn/timeCptn.do?type=show&progrmRegistNo=2609596";
		// getCurrencyRate에서 발생하는 예외처리를 받아서 단순 출력 처리합니다.
		try {
			getCurrencyRate(url);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
