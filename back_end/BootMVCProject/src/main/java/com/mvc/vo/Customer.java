package com.mvc.vo;

import java.io.Serializable;

//vo(value object);customer 테이블 안의 레코드 한 건을 위한 클래스
//default 생성자, getter/setter
public class Customer implements Serializable {
	
	private String num;
	private String name;
	private String address;	
	
	public Customer() {}
	
	public Customer(String num, String name, String address) {
		this.num = num;
		this.name = name;
		this.address = address;
	}

	public String getNum() {
		return num;
	}
	public void setNum(String num) {
		this.num = num;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	
	
}
