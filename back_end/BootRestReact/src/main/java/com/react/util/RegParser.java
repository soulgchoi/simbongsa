package com.react.util;

import java.io.StringReader;
import java.util.List;

import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.xml.sax.InputSource;

import com.react.dao.RegDao;
import com.react.vo.Region;

//정보를 load하는 SAX Parser
public class RegParser {
	// @Autowired
	RegDao dao;

	private String xml;
	// private StringBuilder xml;
	private List<Region> list;

	public RegParser(int i) throws Exception {
		xml = new CallRestWS_reg().restClient(i);
		loadData();
	}

	private void loadData() {
		SAXParserFactory factory = SAXParserFactory.newInstance();
		try {
			SAXParser parser = factory.newSAXParser();
			RegHandler handler = new RegHandler();
			parser.parse(new InputSource(new StringReader(xml)), handler);
			list = handler.getList();
//			Region find;
			for (Region vol : list) {
//				find = volMap.get(vol.getName());
//				if(find!=null) {
//					vol.setCode(find.getCode());
//					vol.setName(find.getName());
//					vol.setMaker(find.getMaker());
//					vol.setMaterial(find.getMaterial());
//					vol.setImg(find.getImg());
//				}
				dao = new RegDao();
				dao.addReg(vol);
				System.out.println(vol);
			}
			// System.out.println(list);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public List<Region> getList() {
		return list;
	}

	public void setList(List<Region> list) {
		this.list = list;
	}

	public static void main(String[] args) throws Exception {
		for (int i = 1; i < 24; i++) {
			new RegParser(i);
		}
	}

}
