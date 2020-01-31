package com.ssafy.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import com.ssafy.util.FoodNutritionSAXHandler;
import com.ssafy.util.FoodSAXHandler;
import com.ssafy.util.FoodSaxParser;
import com.ssafy.vo.Food;
import com.ssafy.vo.FoodPageBean;
import com.ssafy.vo.SafeFoodException;

public class FoodDaoImpl implements FoodDao {
	String driver = "com.mysql.cj.jdbc.Driver";

	String url = "jdbc:mysql://70.12.108.203:3306/safefood?characterEncoding=UTF-8&serverTimezone=UTC&useSSL=false";
	String user = "safefood";
	String password = "kdjcke";
/*	String url = "jdbc:mysql://localhost:3306/tommy?characterEncoding=UTF-8&serverTimezone=UTC";
	String user = "tommy";
	String password = "lion";*/

	public FoodDaoImpl() {
		try {
			Class.forName(driver);
			loadData();
		} catch (ClassNotFoundException e) {
			System.out.println("driver를 가져오지 못했습니다.");
		}
	}

	/**
	 * 식품 영양학 정보와 식품 정보를 xml 파일에서 읽어온다.
	 */
	public void loadData() {

		// FoodNutritionSaxPaser를 이용하여 Food 데이터들을 가져온다
		// 가져온 Food 리스트 데이터를 DB에 저장한다.
		FoodSaxParser fsp = new FoodSaxParser();
		List<Food> list = fsp.getFoods();
		String q = "insert into food values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		try {
			Connection con = DriverManager.getConnection(url, user, password);
			PreparedStatement pstat =  con.prepareStatement(q);
			for (int i = 0; i < list.size(); i++) {
				pstat.setInt(1, list.get(i).getCode());
				pstat.setString(2, list.get(i).getName());
				pstat.setDouble(3, list.get(i).getSupportpereat());
				pstat.setDouble(4, list.get(i).getCalory());
				pstat.setDouble(5, list.get(i).getCarbo());
				pstat.setDouble(6, list.get(i).getProtein());
				pstat.setDouble(7, list.get(i).getFat());
				pstat.setDouble(8, list.get(i).getSugar());
				pstat.setDouble(9, list.get(i).getNatrium());
				pstat.setDouble(10, list.get(i).getChole());
				pstat.setDouble(11, list.get(i).getFattyacid());
				pstat.setDouble(12, list.get(i).getTransfat());
				pstat.setString(13, list.get(i).getMaker());
				pstat.setString(14, list.get(i).getMaterial());
				pstat.setString(15, list.get(i).getImg());
				pstat.setString(16, list.get(i).getAllergy());
				pstat.executeUpdate();
			}
			pstat.close();
			con.close();
		} catch (Exception e) {
			System.out.println("데이터 저장에 실패했습니다.");
		}
	}

	

	/**
	 * 검색 조건(key) 검색 단어(word)에 해당하는 식품 정보(Food)의 개수를 반환. web에서 구현할 내용. web에서 페이징 처리시
	 * 필요
	 * 
	 * @param bean 검색 조건과 검색 단어가 있는 객체
	 * @return 조회한 식품 개수
	 */
	public int foodCount(FoodPageBean bean) {
		List<Food> finds = searchAll(bean);
		
		return finds.size();
	}

	/**
	 * 검색 조건(key) 검색 단어(word)에 해당하는 식품 정보(Food)를 검색해서 반환.
	 * 
	 * @param bean 검색 조건과 검색 단어가 있는 객체
	 * @return 조회한 식품 목록
	 */
	public List<Food> searchAll(FoodPageBean bean) {
		List<Food> finds = new LinkedList<Food>();
		if (bean != null) {
			String key = bean.getKey();
			String word = bean.getWord();
			if (!key.equals("all") && word != null && !word.trim().equals("")) { ///name, maker, material
				String q = "select * from food where " + key +" like'%" + word + "%'";
				
				
				try {
					Connection con = DriverManager.getConnection(url, user, password);
					PreparedStatement pstat =  con.prepareStatement(q);
					ResultSet rs = pstat.executeQuery();
					while (rs.next()) {
						Food f = new Food();
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
						f.setAllergy(rs.getString(16));
						finds.add(f);
					}
					pstat.close();
					rs.close();
					con.close();
				} catch (Exception e) {
					e.printStackTrace();
				}

			}
			else {
				String q = "select * from food";
				
				try {
					Connection con = DriverManager.getConnection(url, user, password);
					PreparedStatement pstat =  con.prepareStatement(q);
					ResultSet rs = pstat.executeQuery();
					while (rs.next()) {
						Food f = new Food();
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
						f.setAllergy(rs.getString(16));
						finds.add(f);
					}
					pstat.close();
					rs.close();
					con.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}

		}
		return finds;
	}

	/**
	 * 식품 코드에 해당하는 식품정보를 검색해서 반환.
	 * 
	 * @param code 검색할 식품 코드
	 * @return 식품 코드에 해당하는 식품 정보, 없으면 null이 리턴됨
	 */
	public Food search(int code) {
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
				f.setAllergy(rs.getString(16));
				
			}
			pstat.close();
			rs.close();
			con.close();
		} catch (Exception e) {
			System.out.println("검색에 실패했습니다.");
		}
		return f;
	}

	/**
	 * 가장 많이 검색한 Food 정보 리턴하기 web에서 구현할 내용.
	 * 
	 * @return
	 */
	public List<Food> searchBest() {
		return null;
	}

	public List<Food> searchBestIndex() {
		return null;
	}

	public static void main(String[] args) {
		FoodDaoImpl dao = new FoodDaoImpl();
		System.out.println(dao.search(1));
		System.out.println("===========================material로 검색=================================");
		print(dao.searchAll(new FoodPageBean("material", "감자전분", null, 0)));
		System.out.println("===========================maker로 검색=================================");
		print(dao.searchAll(new FoodPageBean("maker", "빙그레", null, 0)));
		System.out.println("===========================name으로 검색=================================");
		print(dao.searchAll(new FoodPageBean("name", "라면", null, 0)));
		System.out.println("============================================================");
		print(dao.searchAll(null));
		System.out.println("============================================================");
	}

	public static void print(List<Food> foods) {
		for (Food food : foods) {
			System.out.println(food);
		}
	}
}
