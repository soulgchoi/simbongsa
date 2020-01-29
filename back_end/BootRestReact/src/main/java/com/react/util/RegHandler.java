package com.react.util;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import org.xml.sax.Attributes;
import org.xml.sax.helpers.DefaultHandler;

import com.react.vo.Region;

//url에서 volunteer정보를 읽어 파싱하는 핸들러 클래스
public class RegHandler extends DefaultHandler {
	private List<Region> list;
	private Region vol;
	private String temp;

	public RegHandler() {
		list = new LinkedList<Region>();
	}

	public void startElement(String uri, String localName, String qName, Attributes att) {
		if (qName.equals("item")) {
			vol = new Region();
		}
	}

	public void endElement(String uri, String localName, String qName) {
		if (qName.equals("gugunCd")) {
			vol.setGugunCd(temp);
		} else if (qName.equals("gugunNm")) {
			vol.setGugunNm(temp);
		} else if (qName.equals("sidoCd")) {
			vol.setSidoCd(temp);
		} else if (qName.equals("sidoNm")) {
			vol.setSidoNm(temp);
		} else if(qName.equals("item")) { 
			list.add(vol);
		}
	}

	public void characters(char[] ch, int start, int length) {
		temp = new String(ch, start, length).trim();
	}

	public List<Region> getList() {
		return list;
	}
	public void setList(List<Region> list) {
		this.list = list;
	}

}
