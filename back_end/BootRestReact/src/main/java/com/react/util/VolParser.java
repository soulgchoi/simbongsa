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
	//PostDao dao2;
	
	private String xml;
	// private StringBuilder xml;
	private List<Vol> list;

	public VolParser(int i) throws Exception {
	//public VolParser(int i, int cnt) throws Exception {
		xml = new CallRestWS_vol().restClient(i);
		//loadData(cnt);
		dao = new VolDao();
		loadData();
	}

	//private void loadData(int cnt) {
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
			
			Vol find;
			for (Vol vol : list) {
				SAXParser parser2 = factory.newSAXParser();
				xml = new CallRestWS_detail().restClient(vol.getProgrmRegistNo());
				InputSource is2 = new InputSource(new StringReader(xml));
				//is.setEncoding("ISO-8859-1");
				is2.setEncoding("UTF-8");
				try {
				VolHandler2 handler2 = new VolHandler2();
				parser2.parse(is2, handler2);
				
				find = handler2.getVol();
//				find = volMap.get(vol.getName());
				
					if(find!=null) { //
						
						vol.setActWkdy(find.getActWkdy());
						vol.setProgrmCn(find.getProgrmCn());
						vol.setWanted(find.getWanted());
						vol.setActBeginTm(find.getActBeginTm());
						vol.setActEndTm(find.getActEndTm());
						vol.setAppnow(find.getAppnow());
						vol.setTarget(find.getTarget());
						
					}
				} finally {
					if(dao.getAuth(vol.getProgrmRegistNo())) { //있으면 업데이트
						dao.updateVol(vol);
					}else { //없으면 추가
						dao.addVol(vol);
					}
				}
				//dao2.addPost(new Post("0", ""+cnt++, null, null, "0"));
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
		//int cnt = 1;
		for (int i = 1; i < 400; i++) {
		//for (int i = 1; i < 5; i++) {
			new VolParser(i);
			//cnt += 10;
		}
		System.out.println("완료~~~!!!!");
	}

}
