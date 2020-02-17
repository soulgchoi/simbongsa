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
public class VolHandler extends DefaultHandler {
	RegDao regdao;
	CateDao catedao;
	private List<Vol> list;
	private Vol vol;
	//private String temp;
	private StringBuilder temp = new StringBuilder();
	private String gugunCd, sidoCd, srvcClCode, url, volcode;
	private String[] cateCd = new String[2];
	private int temp2;
	DetailCrawler crawler;
	Map<String, String> map;

	public VolHandler() {
		list = new LinkedList<Vol>();
		//cateCd = new String[2];
		regdao = new RegDao();
		catedao = new CateDao();
		crawler = new DetailCrawler();
	}

	public void startElement(String uri, String localName, String qName, Attributes att) {
		
		//final String name = qName == null ? localName : qName;
		if (qName.equals("item")) {
			vol = new Vol();
			temp.setLength(0);
		}
	}

	public void endElement(String uri, String localName, String qName) {
		//final String name = qName == null ? localName : qName;
		if (qName.equals("actBeginTm")) {
			vol.setActBeginTm(temp.toString() + ":00:00");
		} else if (qName.equals("actEndTm")) {
			vol.setActEndTm(temp.toString() + ":00:00");
		} else if (qName.equals("actPlace")) {
			vol.setActPlace(temp.toString());
		} else if (qName.equals("adultPosblAt")) {
			vol.setAdultPosblAt(temp.toString());
		} else if (qName.equals("gugunCd")) {
			gugunCd = temp.toString();
			//System.out.println("gugun****" + gugunCd);
		} else if (qName.equals("nanmmbyNm")) {
			vol.setNanmmbyNm(temp.toString());
		} else if (qName.equals("noticeBgnde")) {
			vol.setNoticeBgnde(temp.toString());
		} else if (qName.equals("noticeEndde")) {
			vol.setNoticeEndde(temp.toString());
		} else if (qName.equals("progrmBgnde")) {
			vol.setProgrmBgnde(temp.toString());
		} else if (qName.equals("progrmEndde")) {
			vol.setProgrmEndde(temp.toString());
		} else if (qName.equals("progrmRegistNo")) {
			volcode = temp.toString();
			vol.setProgrmRegistNo(volcode);
		} else if (qName.equals("progrmSj")) {
			vol.setProgrmSj(temp.toString());
		} else if (qName.equals("progrmSttusSe")) {
			vol.setProgrmSttusSe(temp.toString());
		} else if (qName.equals("sidoCd")) {
			sidoCd = temp.toString();
			//System.out.println("sido****" + sidoCd);
		} else if (qName.equals("srvcClCode")) {
			srvcClCode = temp.toString();
			System.out.println(srvcClCode);
		} else if (qName.equals("url")) {
			//url = temp.toString();
			//vol.setUrl(url);
		} else if (qName.equals("yngbgsPosblAt")) {
			vol.setYngbgsPosblAt(temp.toString());
		} else if(qName.equals("item")) { 
			cateCd = srvcClCode.split(" > ");
//			System.out.println(cateCd[0]+"000");
//			System.out.println("-----------------");
//			System.out.println(cateCd[1]+"111");
			try {
				url = "https://1365.go.kr/vols/P9210/partcptn/timeCptn.do?type=show&progrmRegistNo=" + volcode;
				vol.setUrl(url);
				
				temp2 = regdao.getRegCd(sidoCd, gugunCd);
				vol.setRegionCd(temp2);
				
				temp2 = catedao.getCateCd(cateCd[0], cateCd[1]);
				vol.setCateCd(temp2);
				
				list.add(vol);////
			} catch (Exception e) {
				e.printStackTrace();
				System.out.println(volcode + "missed~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
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
		//temp = new String(ch, start, length).trim();
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

}
