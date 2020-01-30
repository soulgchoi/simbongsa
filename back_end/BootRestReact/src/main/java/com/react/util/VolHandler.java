package com.react.util;

import java.util.LinkedList;
import java.util.List;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

import com.react.dao.CateDao;
import com.react.dao.RegDao;
import com.react.vo.Vol;

//url에서 volunteer정보를 읽어 파싱하는 핸들러 클래스
public class VolHandler extends DefaultHandler {
	RegDao regdao;
	CateDao catedao;
	private List<Vol> list;
	private Vol vol;
	private String temp;
	private String gugunCd, sidoCd, srvcClCode;
	private String[] cateCd;
	private int temp2;

	public VolHandler() {
		list = new LinkedList<Vol>();
		//cateCd = new String[2];
		regdao = new RegDao();
		catedao = new CateDao();
	}

	public void startElement(String uri, String localName, String qName, Attributes att) {
		
		final String name = qName == null ? localName : qName;
		if (name.equals("item")) {
			vol = new Vol();
		}
	}

	public void endElement(String uri, String localName, String qName) {
		final String name = qName == null ? localName : qName;
		if (qName.equals("actBeginTm")) {
			vol.setActBeginTm(temp);
		} else if (qName.equals("actEndTm")) {
			vol.setActEndTm(temp);
		} else if (qName.equals("actPlace")) {
			vol.setActPlace(temp);
		} else if (qName.equals("adultPosblAt")) {
			vol.setAdultPosblAt(temp);
		} else if (qName.equals("gugunCd")) {
			gugunCd = temp;
			System.out.println("gugun****" + gugunCd);
		} else if (qName.equals("nanmmbyNm")) {
			vol.setNanmmbyNm(temp);
		} else if (qName.equals("noticeBgnde")) {
			vol.setNoticeBgnde(temp);
		} else if (qName.equals("noticeEndde")) {
			vol.setNoticeEndde(temp);
		} else if (qName.equals("progrmBgnde")) {
			vol.setProgrmBgnde(temp);
		} else if (qName.equals("progrmEndde")) {
			vol.setProgrmEndde(temp);
		} else if (qName.equals("progrmRegistNo")) {
			vol.setProgrmRegistNo(temp);
		} else if (qName.equals("progrmSj")) {
			vol.setProgrmSj(temp);
		} else if (qName.equals("progrmSttusSe")) {
			vol.setProgrmSttusSe(temp);
		} else if (qName.equals("sidoCd")) {
			sidoCd = temp;
			System.out.println("sido****" + sidoCd);
		} else if (qName.equals("srvcClCode")) {
			srvcClCode = temp;
			System.out.println(srvcClCode);
		} else if (qName.equals("url")) {
			vol.setUrl(temp);
		} else if (qName.equals("yngbgsPosblAt")) {
			vol.setYngbgsPosblAt(temp);
		} else if(qName.equals("item")) { 
			//cateCd = srvcClCode.split(">");
//			System.out.println(cateCd[0]+"000");
//			System.out.println("DFASASDFASD");
//			System.out.println(cateCd[1]+"111");
			try {
				temp2 = regdao.getRegCd(sidoCd, gugunCd);
				vol.setRegionCd(temp2);
				
				//파싱이 안됨 ..
				//temp2 = catedao.getCateCd(srvcClCode);
				//vol.setCateCd(temp2);
				
				list.add(vol);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	/*
	 * public double changeData_Int(String data) { if (data.equals("") ||
	 * data.equalsIgnoreCase("N/A")) { return 0; } else { return
	 * Integer.parseInt(data); } } public double changeData_Double(String data) { if
	 * (data.equals("") || data.equalsIgnoreCase("N/A")) { return 0; } else { return
	 * Double.parseDouble(data); } }
	 */

	public void characters(char[] ch, int start, int length) {
		temp = new String(ch, start, length).trim();
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
