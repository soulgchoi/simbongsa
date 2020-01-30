package com.detail.crawler;

import org.xml.sax.Attributes;
import org.xml.sax.helpers.DefaultHandler;

import com.react.vo.Vol;

public class DetailHandler extends DefaultHandler {
	private Vol vol;
	private String temp;
	
	public DetailHandler() {}
	
	public void startElement(String uri, String localName, String qName, Attributes att) {
		if(qName.equals("봉사시간")) {
			vol = new Vol();
		}
	}
	
	public void endElement(String uri, String localName, String qName) {
		if(qName.eqa)
	}
}
