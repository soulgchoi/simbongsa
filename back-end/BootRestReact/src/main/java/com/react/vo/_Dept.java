package com.react.vo;

public class _Dept {
	private String dept_id;
	private String name;
	private String region_id;
	
	public _Dept() {}

	public _Dept(String dept_id, String name, String region_id) {
		this.dept_id = dept_id;
		this.name = name;
		this.region_id = region_id;
	}

	public String getDept_id() {
		return dept_id;
	}

	public void setDept_id(String dept_id) {
		this.dept_id = dept_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRegion_id() {
		return region_id;
	}

	public void setRegion_id(String region_id) {
		this.region_id = region_id;
	}

	@Override
	public String toString() {
		return "Dept [dept_id=" + dept_id + ", name=" + name + ", region_id=" + region_id + "]";
	}
	
}
