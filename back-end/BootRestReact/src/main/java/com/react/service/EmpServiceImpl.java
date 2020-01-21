package com.react.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.react.dao.EmpDao;
import com.react.vo._Dept;
import com.react.vo._DeptCount;
import com.react.vo._DeptEmp;
import com.react.vo._Emp;

@Service
public class EmpServiceImpl implements EmpService {
	@Autowired
	EmpDao dao;
	
	@Override
	public List<_Emp> findAllEmps() throws Exception {//모든 직원 정보
		return dao.findAllEmps();
	}

	@Override
	public _Emp findEmpById(String id) throws Exception {//id기준으로 직원 한사람 정보 리턴
		return dao.findEmpById(id);
	}

	@Override
	public int getEmpsTotal() throws Exception {//모든 직원수 리턴(카운트)
		return dao.getEmpsTotal();
	}

	@Override
	public List<_Emp> findLikeEmps(String name) throws Exception {//이름으로 like 검색
		return dao.findLikeEmps(name);
	}

	@Override
	public List<_Dept> findAllDepts() throws Exception {//모든 부서 정보 리턴
		return dao.findAllDepts();
	}

	@Override
	public List<_Emp> findAllTitles() throws Exception {//emp테이블에서 title만 검색해 리턴(중복제거!)
		return dao.findAllTitles();
	}

	@Override
	public boolean addEmp(_Emp emp) throws Exception {//새 직원 추가
		if(dao.addEmp(emp) == 0) {
			return false;
		}else return true;
	}

	@Override
	public boolean updateEmp(_Emp emp) throws Exception {//직원정보 수정
		if(dao.updateEmp(emp) == 0) {
			return false;
		}else return true;
	}

	@Override
	public boolean deleteEmp(String id) throws Exception {//id기준 직원정보 삭제
		if(dao.deleteEmp(id) == 0) {
			return false;
		}else return true;
	}
	
	
	@Override
	public List<_Emp> findEmpByMgrId(int managerId) {
		return dao.findEmpByMgrId(managerId);
	}

	@Override
	public List<_DeptEmp> findAllDeptEmps() {
		return dao.findAllDeptEmps();
	}

	@Override
	public List<_DeptCount> findAllDepCounts() {
		return dao.findAllDepCounts();
	}

	@Override
	public List<_Emp> findDeptByname(String name) {
		return dao.findDeptByname(name);
	}

	@Override
	public List<_Emp> findDeptBydeptid(int dept_id) {
		return dao.findDeptBydeptid(dept_id);
	}

}
