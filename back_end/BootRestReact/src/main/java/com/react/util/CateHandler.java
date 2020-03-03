package com.react.util;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import org.xml.sax.Attributes;
import org.xml.sax.helpers.DefaultHandler;

import com.react.vo.Category;

//url에서 volunteer정보를 읽어 파싱하는 핸들러 클래스
public class CateHandler extends DefaultHandler {
	private List<Category> list;
	private Category vol;
	private String temp;

	public CateHandler() {
		list = new LinkedList<Category>();
	}

	public void startElement(String uri, String localName, String qName, Attributes att) {
		if (qName.equals("item")) {
			vol = new Category();
		}
	}

	public void endElement(String uri, String localName, String qName) {
		if (qName.equals("highClsCd")) {
			vol.setHighClsCd(temp);
		} else if (qName.equals("hignClsNm")) {
			vol.setHignClsNm(temp);
		} else if (qName.equals("lowClsCd")) {
			vol.setLowClsCd(temp);
		} else if (qName.equals("lowClsNm")) {
			vol.setLowClsNm(temp);
		} else if(qName.equals("item")) { 
			list.add(vol);
		}
	}

	public void characters(char[] ch, int start, int length) {
		temp = new String(ch, start, length).trim();
	}

	public List<Category> getList() {
		return list;
	}
	public void setList(List<Category> list) {
		this.list = list;
	}

}
