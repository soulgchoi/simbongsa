package com.react.vo;

public class _DeptCount {
	private String dept_id;
	private String dname;
	private String count;
	
	public _DeptCount() {}

	public _DeptCount(String dept_id, String dname, String count) {
		this.dept_id = dept_id;
		this.dname = dname;
		this.count = count;
	}

	public String getDept_id() {
		return dept_id;
	}

	public void setDept_id(String dept_id) {
		this.dept_id = dept_id;
	}

	public String getDname() {
		return dname;
	}

	public void setDname(String dname) {
		this.dname = dname;
	}

	public String getCount() {
		return count;
	}

	public void setCount(String count) {
		this.count = count;
	}

	@Override
	public String toString() {
		return "DeptCount [dept_id=" + dept_id + ", dname=" + dname + ", count=" + count + "]";
	}
	
}
