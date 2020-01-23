package com.react.util;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import org.xml.sax.Attributes;
import org.xml.sax.helpers.DefaultHandler;

import com.react.vo.Vol;

//url에서 volunteer정보를 읽어 파싱하는 핸들러 클래스
public class VolHandler extends DefaultHandler {
	private List<Vol> list;
	private Vol vol;
	private String temp;

	public VolHandler() {
		list = new LinkedList<Vol>();
	}

	public void startElement(String uri, String localName, String qName, Attributes att) {
		if (qName.equals("item")) {
			vol = new Vol();
		}
	}

	public void endElement(String uri, String localName, String qName) {
		if (qName.equals("actBeginTm")) {
			vol.setActBeginTm(temp);
		} else if (qName.equals("actEndTm")) {
			vol.setActEndTm(temp);
		} else if (qName.equals("actPlace")) {
			vol.setActPlace(temp);
		} else if (qName.equals("adultPosblAt")) {
			vol.setAdultPosblAt(temp);
		} else if (qName.equals("gugunCd")) {
			vol.setGugunCd(temp);
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
			vol.setSidoCd(temp);
		} else if (qName.equals("srvcClCode")) {
			vol.setSrvcClCode(temp);
		}else if(qName.equals("item")) { 
			list.add(vol);
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

	public List<Vol> getList() {
		return list;
	}
	public void setList(List<Vol> list) {
		this.list = list;
	}

//	public void main(String[] args) throws Exception {
//		//System.out.println(CallRestWS.restClient());
//		
//	}
}
