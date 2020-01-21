package com.react.vo;

public class _Emp {
	private String id;
	private String name;
	private String mailid;
	private String start_date;
	private String manager_id;
	private String title;
	private String dept_id;
	private String salary;
	private String commission_pct;
	
	public _Emp() {}

	public _Emp(String id, String name, String mailid, String start_date, String manager_id, String title,
			String dept_id, String salary, String commission_pct) {
		this.id = id;
		this.name = name;
		this.mailid = mailid;
		this.start_date = start_date;
		this.manager_id = manager_id;
		this.title = title;
		this.dept_id = dept_id;
		this.salary = salary;
		this.commission_pct = commission_pct;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMailid() {
		return mailid;
	}

	public void setMailid(String mailid) {
		this.mailid = mailid;
	}

	public String getStart_date() {
		return start_date;
	}

	public void setStart_date(String start_date) {
		this.start_date = start_date;
	}

	public String getManager_id() {
		return manager_id;
	}

	public void setManager_id(String manager_id) {
		this.manager_id = manager_id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDept_id() {
		return dept_id;
	}

	public void setDept_id(String dept_id) {
		this.dept_id = dept_id;
	}

	public String getSalary() {
		return salary;
	}

	public void setSalary(String salary) {
		this.salary = salary;
	}

	public String getCommission_pct() {
		return commission_pct;
	}

	public void setCommission_pct(String commission_pct) {
		this.commission_pct = commission_pct;
	}

	@Override
	public String toString() {
		return "Emp [id=" + id + ", name=" + name + ", mailid=" + mailid + ", start_date=" + start_date
				+ ", manager_id=" + manager_id + ", title=" + title + ", dept_id=" + dept_id + ", salary=" + salary
				+ ", commission_pct=" + commission_pct + "]";
	}
	
}
