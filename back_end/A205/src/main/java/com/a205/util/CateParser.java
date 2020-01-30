package com.a205.util;

import java.io.StringReader;
import java.util.List;

import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.xml.sax.InputSource;

import com.a205.dao.CateDao;
import com.a205.dto.Category;

//정보를 load하는 SAX Parser
@Service
public class CateParser {
	@Autowired
	CateDao dao;
	
	private String xml;
	//private StringBuilder xml;
	private List<Category> list;
	
	public CateParser() throws Exception {
		xml = new CallRestWS_cate().restClient();
		loadData();
	}

	private void loadData() {
		SAXParserFactory factory = SAXParserFactory.newInstance();
		try{
			SAXParser parser = factory.newSAXParser();
			CateHandler handler = new CateHandler();
			parser.parse(new InputSource(new StringReader(xml)),handler);
			list = handler.getList();
//			Category find;
			for (Category vol : list) {
//				find = volMap.get(vol.getName());
//				if(find!=null) {
//					vol.setCode(find.getCode());
//					vol.setName(find.getName());
//					vol.setMaker(find.getMaker());
//					vol.setMaterial(find.getMaterial());
//					vol.setImg(find.getImg());
//				}
				System.out.println(vol);
				dao.addCate(vol);
				//vol.setHignClsNm("ddffs");
				//System.out.println(vol);
			}
			//System.out.println(list);
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	public List<Category> getList() {
		return list;
	}
	
	public void setList(List<Category> list) {
		this.list = list;
	}
	
	public static void main(String[] args) throws Exception {
		new CateParser();
	}
	
}
