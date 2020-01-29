package com.mvc.service;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.mvc.vo.Customer;

//client(CustomerApp.java)를 위한 인터페이스
public interface CustomerService {
	public List<Customer> selectAll();
	public Customer selectOne(String num);
	public void insert(Customer c);
	public void delete(String num);
	public List<Customer> findByAddress(String address);
	public void update(Customer c);
	
}





