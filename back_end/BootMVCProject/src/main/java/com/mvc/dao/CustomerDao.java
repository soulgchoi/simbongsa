package com.mvc.dao;

import java.util.List;

import com.mvc.vo.Customer;

//client(CustomerServiceImpl.java)를 위한 인터페이스
public interface CustomerDao {
	public List<Customer> selectAll();
	public Customer selectOne(String num);
	public int insert(Customer c);
	public int delete(String num);
	public List<Customer> findByAddress(String address);
	public void update(Customer c);
	//public void txTest(String num);
	
}





