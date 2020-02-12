package com.react.util;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.xml.sax.Attributes;
import org.xml.sax.helpers.DefaultHandler;

import com.detail.crawler.DetailCrawler;
import com.react.dao.CateDao;
import com.react.dao.RegDao;
import com.react.vo.Vol;

//url에서 volunteer정보를 읽어 파싱하는 핸들러 클래스
public class VolHandler2 extends DefaultHandler {
	RegDao regdao;
	CateDao catedao;
	private List<Vol> list;
	private Vol vol;
	// private String temp;
	private StringBuilder temp = new StringBuilder();
	private String url, volcode;
	private String[] cateCd = new String[2];
	private int temp2;
	DetailCrawler crawler;
	Map<String, String> map;

	public VolHandler2() {
		//volcode = code;
		list = new LinkedList<Vol>();
		// cateCd = new String[2];
		crawler = new DetailCrawler();
	}

	public void startElement(String uri, String localName, String qName, Attributes att) {

		// final String name = qName == null ? localName : qName;
		if (qName.equals("item")) {
			vol = new Vol();
			temp.setLength(0);
		}
	}

	public void endElement(String uri, String localName, String qName) {
		// final String name = qName == null ? localName : qName;
		if (qName.equals("actWkdy")) {
			vol.setActWkdy(temp.toString());
		} else if (qName.equals("progrmCn")) {
			vol.setProgrmCn(temp.toString());
		} else if (qName.equals("progrmRegistNo")) {
			volcode = temp.toString();
		} else if (qName.equals("rcritNmpr")) {
			vol.setWanted(temp.toString());
		} else if (qName.equals("item")) {
			System.out.println(volcode + "크롤링시작"); // 아직 모집시작 안된 정보는 크롤링이 안됨....
			try {
				url = "https://1365.go.kr/vols/P9210/partcptn/timeCptn.do?type=show&progrmRegistNo=" + volcode;
				map = crawler.getCurrencyRate(url);
				vol.setActBeginTm(map.get("bgnTm"));
				vol.setActEndTm(map.get("endTm"));
				// vol.setWanted(map.get("wanted"));
				// vol.setActWkdy(map.get("Wkdy"));
				vol.setAppnow(map.get("appnow"));
				vol.setTarget(map.get("target"));
				// vol.setProgrmCn(map.get("detail"));

				// list.update(vol); /////

			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				list.add(vol);////
			}
		}
		temp.setLength(0);
	}

	/*
	 * public double changeData_Int(String data) { if (data.equals("") ||
	 * data.equalsIgnoreCase("N/A")) { return 0; } else { return
	 * Integer.parseInt(data); } } public double changeData_Double(String data) { if
	 * (data.equals("") || data.equalsIgnoreCase("N/A")) { return 0; } else { return
	 * Double.parseDouble(data); } }
	 */

	public void characters(char[] ch, int start, int length) {
		// temp = new String(ch, start, length).trim();
		temp.append(ch, start, length);
	}

	/*
	 * @Override public void characters(char[] ch, int start, int length) throws
	 * SAXException { temp = String.copyValueOf(ch, start, length).trim(); temp =
	 * temp.replace("&", "&amp;") }
	 */

	public List<Vol> getList() {
		return list;
	}

	public void setList(List<Vol> list) {
		this.list = list;
	}

	public Vol getVol() {
		return vol;
	}
}
