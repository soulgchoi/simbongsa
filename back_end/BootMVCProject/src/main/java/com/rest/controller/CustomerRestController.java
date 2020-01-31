package com.rest.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.mvc.service.CustomerService;
import com.mvc.vo.Customer;

import io.swagger.annotations.ApiOperation;

//@RestController = @Controller + @ResponseBody 가 합쳐진 어노테이션
//								  @ResponseBody : 응답결과(자바 객체)를 json 형식으로 바꿔 보내줌
@CrossOrigin("*")
@RestController
public class CustomerRestController {
	@Autowired
	CustomerService service;
	
	//GET - http://localhost:9090/rest/customers
	@RequestMapping(value="/customers", method=RequestMethod.GET)
	@ApiOperation("모든 고객 정보") //
	public List<Customer> selectAll(){
		return service.selectAll();
	}
	
	//GET - http://localhost:9090/rest/customers/address/la
	//GET - http://localhost:9090/rest/customers/name/kim
	@RequestMapping(value="/customers/{condition}/{value}", method=RequestMethod.GET)
	@ApiOperation("조건별 고객 검색") //
	public List<Customer> find(@PathVariable String condition, @PathVariable String value){ //url 경로상의 {num}을 가져오기 위한 어노테이션
		if(condition.equals("address")) {
			return service.findByAddress(value);
		}else { //name 등
			//return service.findByName(value); //이 메소드는 없음
			return null;
		}
	}
	
	//GET - http://localhost:9090/rest/customers/111
	@RequestMapping(value="/customers/{num}", method=RequestMethod.GET)
	@ApiOperation("해당 번호의 고객 정보") //
	public Customer selectOne(@PathVariable String num){ //url 경로상의 {num}을 가져오기 위한 어노테이션
		return service.selectOne(num);
	}
	
	//DELETE - http://localhost:9090/rest/customers/111
	@RequestMapping(value="/customers/{num}", method=RequestMethod.DELETE) //메소드를 오퍼레이션으로 변경
	@ApiOperation("해당 번호의 고객 정보 삭제") //
	public Map delete(@PathVariable String num){ //url 경로상의 {num}을 가져오기 위한 어노테이션
		service.delete(num);
		HashMap<String, String> map = new HashMap();
		map.put("result", "삭제성공");
		return map;
	}
	
	//POST - http://localhost:9090/rest/customers
	@RequestMapping(value="/customers", method=RequestMethod.POST) //메소드를 오퍼레이션으로 변경
	@ApiOperation("새 고객 등록") //
	public Map insert(@RequestBody Customer c){
					//@RequestBody(json -> java객체) : RequestBody에 담겨져 온 "json객체가 vo인 Customer에 매핑됨!!!"
		service.insert(c);
		HashMap<String, String> map = new HashMap();
		map.put("result", "추가성공");
		return map;
	}
	
	//PUT - http://localhost:9090/rest/customers
	@RequestMapping(value="/customers", method=RequestMethod.PUT)
	@ApiOperation("고객 정보 수정") //
	public Map update(@RequestBody Customer c){
					//@RequestBody(json -> java객체) : RequestBody에 담겨져 온 "json객체가 vo인 Customer에 매핑됨!!!"
		service.update(c);
		HashMap<String, String> map = new HashMap();
		map.put("result", "수정성공");
		return map;
	}
	
}
