package com.map.dto;

public class Regex {
	private String normal;
	private String big;
	private String mid;
	private String small;
	public String getNormal() {
		return normal;
	}
	public void setNormal(String normal) {
		this.normal = normal;
	}
	public String getBig() {
		return big;
	}
	public void setBig(String big) {
		this.big = big;
	}
	public String getMid() {
		return mid;
	}
	public void setMid(String mid) {
		this.mid = mid;
	}
	public String getSmall() {
		return small;
	}
	public void setSmall(String small) {
		this.small = small;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((big == null) ? 0 : big.hashCode());
		result = prime * result + ((mid == null) ? 0 : mid.hashCode());
		result = prime * result + ((normal == null) ? 0 : normal.hashCode());
		result = prime * result + ((small == null) ? 0 : small.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Regex other = (Regex) obj;
		if (big == null) {
			if (other.big != null)
				return false;
		} else if (!big.equals(other.big))
			return false;
		if (mid == null) {
			if (other.mid != null)
				return false;
		} else if (!mid.equals(other.mid))
			return false;
		if (normal == null) {
			if (other.normal != null)
				return false;
		} else if (!normal.equals(other.normal))
			return false;
		if (small == null) {
			if (other.small != null)
				return false;
		} else if (!small.equals(other.small))
			return false;
		return true;
	}
	public Regex(String normal, String big, String mid, String small) {
		super();
		this.normal = normal;
		this.big = big;
		this.mid = mid;
		this.small = small;
	}
	public Regex() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
