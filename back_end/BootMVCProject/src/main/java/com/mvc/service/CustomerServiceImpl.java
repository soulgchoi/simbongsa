package com.mvc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mvc.dao.CustomerDao;
import com.mvc.vo.Customer;

//클라이언트(CustomerApp.java)가 사용하는 객체(=서비스 객체) -> 이 객체를 getBean해가서 이 안의 메소드를 활용
//@Component("cus")
@Service("cus") //Component중에서도 역할이 Service 객체임을 표시하는 어노테이션. 위와 동일
public class CustomerServiceImpl implements CustomerService {
	@Autowired
	CustomerDao dao; //type기준으로 주입 (CustomerDaoImpl은 CustomerDaoImpl타입이자 부모인 CustomerDao타입이기도 함!!!!)
					 //	-> 실제로는 CustomerDaoImpl을 주입한다!
					 //(인터페이스이므로 다른 자식도 주입할 수 있다!!)
	
	@Override
	public List<Customer> selectAll() {
		return dao.selectAll();
	}

	@Override
	public Customer selectOne(String num) {
		return dao.selectOne(num);
	}

	@Override
	public void insert(Customer c) {
		dao.insert(c);
	}
	
	@Override
	public void delete(String num) {
		dao.delete(num);
	}

	@Override
	public List<Customer> findByAddress(String address) {
		return dao.findByAddress(address);
	}

	@Override
	public void update(Customer c) {
		dao.update(c);
	}
	
}
