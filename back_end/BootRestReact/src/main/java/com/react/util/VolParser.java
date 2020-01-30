package com.react.util;

import java.io.StringReader;
import java.util.List;

import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.xml.sax.InputSource;

import com.react.dao.VolDao;
import com.react.vo.Vol;

//정보를 load하는 SAX Parser
public class VolParser {
	VolDao dao;

	private String xml;
	// private StringBuilder xml;
	private List<Vol> list;

	public VolParser(int i) throws Exception {
		xml = new CallRestWS_vol().restClient(i);
		loadData();
	}

	private void loadData() {
		SAXParserFactory factory = SAXParserFactory.newInstance();
		factory.setNamespaceAware(true);//
		try {
			SAXParser parser = factory.newSAXParser();
			VolHandler handler = new VolHandler();
			InputSource is = new InputSource(new StringReader(xml));
			//is.setEncoding("ISO-8859-1");
			is.setEncoding("UTF-8");
			parser.parse(is, handler);
			
			//parser.parse(new InputSource(new StringReader(xml)), handler);
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
				dao = new VolDao();
				dao.addVol(vol);
				System.out.println(vol);
			}
			// System.out.println(list);
		} catch (Exception e) {
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
		for (int i = 1; i < 413; i++) {
			new VolParser(i);
		}
	}

}
