package com.ssafy.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;

import com.ssafy.dao.FoodDao;
import com.ssafy.dao.FoodDaoImpl;
import com.ssafy.vo.Food;
import com.ssafy.vo.FoodPageBean;

public class FoodServiceImpl implements FoodService{
	private FoodDao dao;
	private String[] allergys={"대두","땅콩","우유","게","새우","참치","연어","쑥","소고기","닭고기","돼지고기","복숭아","민들레","계란흰자"};
	String driver = "com.mysql.cj.jdbc.Driver";

	String url = "jdbc:mysql://70.12.108.203:3306/safefood?characterEncoding=UTF-8&serverTimezone=UTC&useSSL=false";
	String user = "safefood";
	String password = "kdjcke";
/*	String url = "jdbc:mysql://localhost:3306/tommy?characterEncoding=UTF-8&serverTimezone=UTC";
	String user = "tommy";
	String password = "lion";*/
	
	public FoodServiceImpl() {
		 dao =new FoodDaoImpl();
	}
	public List<Food> searchAll(FoodPageBean bean) {
		return dao.searchAll(bean);
	}
	public Food search(int code) {

		//  code에  맞는 식품 정보를 검색하고, 검색된 식품의 원재료에 알레르기 성분이 있는지 확인하여 Food 정보에 입력한다.
		String q = "select * from food where code = ?";
		Food f = new Food();
		try {
			Connection con = DriverManager.getConnection(url, user, password);
			PreparedStatement pstat =  con.prepareStatement(q);
			pstat.setInt(1, code);
			ResultSet rs = pstat.executeQuery();
			if (rs.next()) {
				f.setCode(rs.getInt(1));
				f.setName(rs.getString(2));
				f.setSupportpereat(rs.getDouble(3));
				f.setCalory(rs.getDouble(4));
				f.setCarbo(rs.getDouble(5));
				f.setProtein(rs.getDouble(6));
				f.setFat(rs.getDouble(7));
				f.setSugar(rs.getDouble(8));
				f.setNatrium(rs.getDouble(9));
				f.setChole(rs.getDouble(10));
				f.setFattyacid(rs.getDouble(11));
				f.setTransfat(rs.getDouble(12));
				f.setMaker(rs.getString(13));
				f.setMaterial(rs.getString(14));
				f.setImg(rs.getString(15));
				f.setAllergy("알레르기 일으키는 제품이 없습니다!");
				for(int i=0; i<allergys.length;i++) {
					if(rs.getString(14).contains(allergys[i])) {
						f.setAllergy(allergys[i]);
						break;
					}
				}
				
				
			}
			pstat.close();
			rs.close();
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return f;
		
		
		
	}
	public List<Food> searchBest() {
		return dao.searchBest();
	}
	public List<Food> searchBestIndex() {
		return dao.searchBestIndex();
	}
}
