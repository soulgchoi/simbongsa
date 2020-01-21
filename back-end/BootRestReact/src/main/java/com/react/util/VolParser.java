package com.react.util;

import java.util.List;
import java.util.Map;

import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import com.react.vo.Vol;
import com.react.util.VolHandler;

//정보를 load하는 SAX Parser
public class VolParser {
	private String Path = "";
	private StringBuilder xml;
	private List<Vol> list;
	
	public VolParser() {
		loadData();
	}

	private void loadData() {
		SAXParserFactory factory = SAXParserFactory.newInstance();
		try{
			SAXParser parser = factory.newSAXParser();
			VolHandler handler = new VolHandler();
			parser.parse(Path,handler);
			list = handler.getList();
			Vol find;
			for (Vol vol : list) {
				find = volMap.get(vol.getName());
				if(find!=null) {
					vol.setCode(find.getCode());
					vol.setName(find.getName());
					vol.setMaker(find.getMaker());
					vol.setMaterial(find.getMaterial());
					vol.setImg(find.getImg());
				}
			}
			System.out.println(list);
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	public List<Vol> getList() {
		return list;
	}
	public void setList(List<Vol> list) {
		this.list = list;
	}
	
}
