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

import com.react.util.CateParser;
import com.react.vo.Vol;

import io.swagger.annotations.ApiOperation;

//@RestController = @Controller + @ResponseBody 가 합쳐진 어노테이션
//								  @ResponseBody : 응답결과(자바 객체)를 json 형식으로 바꿔 보내줌
@CrossOrigin("*")
@RestController
public class VolRestController {
	@Autowired
	CateParser service1;
	
	@RequestMapping(value="/", method=RequestMethod.GET)
	@ApiOperation("모든 사원 정보") //
	public void insertVols(){
		try {
			service1 = new CateParser();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/*
	 * @RequestMapping(value="/emp/id/{id}", method=RequestMethod.GET)
	 * 
	 * @ApiOperation("id 사원 검색") // public Vol findEmpById(@PathVariable String id){
	 * try { return service.findEmpById(id); } catch (Exception e) {
	 * e.printStackTrace(); return null; } }
	 * 
	 * @RequestMapping(value="/emp/count", method=RequestMethod.GET)
	 * 
	 * @ApiOperation("총 사원 수") // public int getEmpsTotal(){ try { return
	 * service.getEmpsTotal(); } catch (Exception e) { e.printStackTrace(); return
	 * -1; } }
	 * 
	 * @RequestMapping(value="/emp/name/{name}", method=RequestMethod.GET)
	 * 
	 * @ApiOperation("이름 사원 검색") // public List<Vol> findLikeEmps(@PathVariable
	 * String name){ try { return service.findLikeEmps(name); } catch (Exception e)
	 * { e.printStackTrace(); return null; } }
	 * 
	 * @RequestMapping(value="/dept", method=RequestMethod.GET)
	 * 
	 * @ApiOperation("모든 부서 정보") // public List<_Dept> findAllDepts(){ try { return
	 * service.findAllDepts(); } catch (Exception e) { e.printStackTrace(); return
	 * null; } }
	 * 
	 * @RequestMapping(value="/emp/title", method=RequestMethod.GET)
	 * 
	 * @ApiOperation("모든 title 정보") // public List<Vol> findAllTitles(){ try {
	 * return service.findAllTitles(); } catch (Exception e) { e.printStackTrace();
	 * return null; } }
	 * 
	 * @RequestMapping(value="/emp", method=RequestMethod.POST) //메소드를 오퍼레이션으로 변경
	 * 
	 * @ApiOperation("새 사원 등록") // public Map addEmp(@RequestBody Vol emp){
	 * HashMap<String, String> map = new HashMap<>(); try { service.addEmp(emp);
	 * map.put("result", "추가성공"); } catch (Exception e) { e.printStackTrace();
	 * map.put("result", "추가실패"); } return map; }
	 * 
	 * @RequestMapping(value="/emp", method=RequestMethod.PUT)
	 * 
	 * @ApiOperation("사원 정보 수정") // public Map updateEmp(@RequestBody Vol emp){
	 * HashMap<String, String> map = new HashMap<>(); try { service.updateEmp(emp);
	 * map.put("result", "수정성공"); } catch (Exception e) { e.printStackTrace();
	 * map.put("result", "수정실패"); } return map; }
	 * 
	 * @RequestMapping(value="/emp/{id}", method=RequestMethod.DELETE) //메소드를
	 * 오퍼레이션으로 변경
	 * 
	 * @ApiOperation("해당 번호의 고객 정보 삭제") // public Map deleteEmp(@PathVariable String
	 * id){ //url 경로상의 {num}을 가져오기 위한 어노테이션 HashMap<String, String> map = new
	 * HashMap<>(); try { service.deleteEmp(id); map.put("result", "삭제성공"); } catch
	 * (Exception e) { e.printStackTrace(); map.put("result", "삭제실패"); } return map;
	 * }
	 * 
	 * @RequestMapping(value="/emp/mgr/{managerId}", method=RequestMethod.GET)
	 * 
	 * @ApiOperation("매니저의 사원 검색") // public List<Vol> findEmpByMgrId(@PathVariable
	 * int managerId){ try { return service.findEmpByMgrId(managerId); } catch
	 * (Exception e) { e.printStackTrace(); return null; } }
	 * 
	 * @RequestMapping(value="/empdept", method=RequestMethod.GET)
	 * 
	 * @ApiOperation("사원 부서 정보") // public List<_DeptEmp> findAllDeptEmps(){ try {
	 * return service.findAllDeptEmps(); } catch (Exception e) {
	 * e.printStackTrace(); return null; } }
	 * 
	 * @RequestMapping(value="/deptcount", method=RequestMethod.GET)
	 * 
	 * @ApiOperation("부서 사원 수") //회계부 사람 없음!!!! public List<_DeptCount>
	 * findAllDepCounts(){ try { return service.findAllDepCounts(); } catch
	 * (Exception e) { e.printStackTrace(); return null; } }
	 * 
	 * @RequestMapping(value="/dept/name/{name}", method=RequestMethod.GET)
	 * 
	 * @ApiOperation("부서 이름 검색") // public List<Vol> findDeptByname(@PathVariable
	 * String name){ try { return service.findDeptByname(name); } catch (Exception
	 * e) { e.printStackTrace(); return null; } }
	 * 
	 * @RequestMapping(value="/dept/id/{dept_id}", method=RequestMethod.GET)
	 * 
	 * @ApiOperation("부서 번호 검색") // public List<Vol> findDeptBydeptid(@PathVariable
	 * int dept_id){ try { return service.findDeptBydeptid(dept_id); } catch
	 * (Exception e) { e.printStackTrace(); return null; } }
	 */
}
