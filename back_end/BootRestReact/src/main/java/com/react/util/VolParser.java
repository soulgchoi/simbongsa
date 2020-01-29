package com.react.util;

import java.io.StringReader;
import java.util.List;

import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.xml.sax.InputSource;

import com.react.vo.Vol;

//정보를 load하는 SAX Parser
public class VolParser {
	private String xml;
	//private StringBuilder xml;
	private List<Vol> list;
	
	public VolParser() throws Exception {
		xml = new CallRestWS().restClient();
		loadData();
	}

	private void loadData() {
		SAXParserFactory factory = SAXParserFactory.newInstance();
		try{
			SAXParser parser = factory.newSAXParser();
			VolHandler handler = new VolHandler();
			parser.parse(new InputSource(new StringReader(xml)),handler);
			list = handler.getList();
//			Vol find;
			for (Vol vol : list) {
//				find = volMap.get(vol.getName());
//				if(find!=null) {
//					vol.setCode(find.getCode());
//					vol.setName(find.getName());
//					vol.setMaker(find.getMaker());
//					vol.setMaterial(find.getMaterial());
//					vol.setImg(find.getImg());
//				}
				System.out.println(vol);
			}
			//System.out.println(list);
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
	
	public static void main(String[] args) throws Exception {
		new VolParser();
	}
	
}
