package com.react.dao;

import java.util.List;

import com.react.vo._Dept;
import com.react.vo._DeptCount;
import com.react.vo._DeptEmp;
import com.react.vo._Emp;

public interface EmpDao {
	
	public List<_Emp> findAllEmps() throws Exception;//모든 직원 정보
	public _Emp findEmpById(String id) throws Exception;//id기준으로 직원 한사람 정보 리턴
	public int getEmpsTotal() throws Exception;//모든 직원수 리턴
	public List<_Emp> findLikeEmps(String name) throws Exception;//이름으로 like 검색
	
	public List<_Dept> findAllDepts() throws Exception;//모든 부서 정보 리턴
	public List<_Emp> findAllTitles() throws Exception;//emp테이블에서 title만 검색해 리턴(중복제거)
	
	public int addEmp(_Emp emp) throws Exception;//새 직원 추가
	public int updateEmp(_Emp emp) throws Exception;//직원정보 수정
	public int deleteEmp(String id) throws Exception;//id기준 직원정보 삭제

	/*추가*/
	public List<_Emp> findEmpByMgrId(int managerId);//managerId에 해당하는 manager를 가지는 직원의 목록을 반환
	public List<_DeptEmp> findAllDeptEmps();//직원정보(id, name, mailid)와 함께 부서정보(dept_id, name)를 DeptEmp 목록 형태로 반환
	public List<_DeptCount> findAllDepCounts();//부서코드, 이름과 함께 직원수를 DeptCount의 목록 형태로 반환
	public List<_Emp> findDeptByname(String name);//부서명에 해당하는 직원들의 목록을 반환
	public List<_Emp> findDeptBydeptid(int dept_id);//deptId에 속한 직원들의 목록을 반환
	
}
