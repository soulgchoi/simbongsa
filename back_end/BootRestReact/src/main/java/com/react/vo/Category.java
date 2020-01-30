package com.react.vo;

public class Category {
/*						
	<highClsCd>0100</highClsCd>
	<hignClsNm>생활편의지원</hignClsNm>
	<lowClsCd/>
	<lowClsNm/>
*/
	protected String highClsCd;
	protected String hignClsNm;
	protected String lowClsCd;
	protected String lowClsNm;
	
	public Category() {}
	public Category(String highClsCd, String hignClsNm, String lowClsCd, String lowClsNm) {
		this.highClsCd = highClsCd;
		this.hignClsNm = hignClsNm;
		this.lowClsCd = lowClsCd;
		this.lowClsNm = lowClsNm;
	}
	
	public String getHighClsCd() {
		return highClsCd;
	}
	public void setHighClsCd(String highClsCd) {
		this.highClsCd = highClsCd;
	}
	public String getHignClsNm() {
		return hignClsNm;
	}
	public void setHignClsNm(String hignClsNm) {
		this.hignClsNm = hignClsNm;
	}
	public String getLowClsCd() {
		return lowClsCd;
	}
	public void setLowClsCd(String lowClsCd) {
		this.lowClsCd = lowClsCd;
		//this.lowClsCd = null;
	}
	public String getLowClsNm() {
		return lowClsNm;
	}
	public void setLowClsNm(String lowClsNm) {
		this.lowClsNm = lowClsNm;
		//this.lowClsNm = null;
	}
	
	@Override
	public String toString() {
		return "Category [highClsCd=" + highClsCd + ", hignClsNm=" + hignClsNm + ", lowClsCd=" + lowClsCd
				+ ", lowClsNm=" + lowClsNm + "]";
	}
	
}
