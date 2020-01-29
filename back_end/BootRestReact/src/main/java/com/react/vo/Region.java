package com.react.vo;

public class Region {
/*						<gugunCd>3000000</gugunCd>
						<gugunNm>종로구</gugunNm>
						<sidoCd>6110000</sidoCd>
						<sidoNm>서울특별시</sidoNm>
*/
	protected String gugunCd;
	protected String gugunNm;
	protected String sidoCd;
	protected String sidoNm;
	
	public Region() {}
	public Region(String gugunCd, String gugunNm, String sidoCd, String sidoNm) {
		this.gugunCd = gugunCd;
		this.gugunNm = gugunNm;
		this.sidoCd = sidoCd;
		this.sidoNm = sidoNm;
	}
	
	public String getGugunCd() {
		return gugunCd;
	}
	public void setGugunCd(String gugunCd) {
		this.gugunCd = gugunCd;
	}
	public String getGugunNm() {
		return gugunNm;
	}
	public void setGugunNm(String gugunNm) {
		this.gugunNm = gugunNm;
	}
	public String getSidoCd() {
		return sidoCd;
	}
	public void setSidoCd(String sidoCd) {
		this.sidoCd = sidoCd;
	}
	public String getSidoNm() {
		return sidoNm;
	}
	public void setSidoNm(String sidoNm) {
		this.sidoNm = sidoNm;
	}
	
	@Override
	public String toString() {
		return "Region [gugunCd=" + gugunCd + ", gugunNm=" + gugunNm + ", sidoCd=" + sidoCd + ", sidoNm=" + sidoNm
				+ "]";
	}

}
