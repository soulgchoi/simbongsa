package com.react.vo;

public class _DeptEmp {

	private String id;
	private String ename;
	private String mailid;
	private String dept_id;
	private String dname;
	
	public _DeptEmp() {}

	public _DeptEmp(String dept_id, String dname, String id, String ename, String mailid) {
		this.dept_id = dept_id;
		this.dname = dname;
		this.id = id;
		this.ename = ename;
		this.mailid = mailid;
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

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getEname() {
		return ename;
	}

	public void setEname(String ename) {
		this.ename = ename;
	}

	public String getMailid() {
		return mailid;
	}

	public void setMailid(String mailid) {
		this.mailid = mailid;
	}

	@Override
	public String toString() {
		return "DeptEmp [dept_id=" + dept_id + ", dname=" + dname + ", id=" + id + ", ename=" + ename + ", mailid="
				+ mailid + "]";
	}
	
}
