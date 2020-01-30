package com.a205.dto;

public class Vol {
/*						"actBeginTm": 14,
                        "actEndTm": 16,
                        "actPlace": "교육(보령시자원봉사센터 2층 교육실), 봉사장소(관내 축제장 및 행사장)",
                        "adultPosblAt": "N",
                        "gugunCd": 4510000,
                        "nanmmbyNm": "충청남도 보령시",
                        "noticeBgnde": 20200108,
                        "noticeEndde": 20200229,
                        "progrmBgnde": 20200411,
                        "progrmEndde": 20200425,
                        "progrmRegistNo": 2605664,
                        "progrmSj": "2020년 제3기 청소년 전문봉사단(풍선아트) 모집",
                        "progrmSttusSe": 2,
                        "sidoCd": 6440000,
                        "srvcClCode": "교육 > 전문교육",
                        "url": "https://1365.go.kr/vols/P9210/partcptn/timeCptn.do?type=show&progrmRegistNo=2605664",
                        "yngbgsPosblAt": "Y"
*/
	protected String actBeginTm;
	protected String actEndTm;
	protected String actPlace;
	protected String adultPosblAt;
	protected String gugunCd;
	protected String nanmmbyNm;
	protected String noticeBgnde;
	protected String noticeEndde;
	protected String progrmBgnde;
	protected String progrmEndde;
	protected String progrmRegistNo;
	protected String progrmSj;
	protected String progrmSttusSe;
	protected String sidoCd;
	protected String srvcClCode;
	protected String url;
	protected String yngbgsPosblAt;
	protected String actWkdy; //
	protected String progrmCn; //
	
	public Vol() {}
	public Vol(String actBeginTm, String actEndTm, String actPlace, String adultPosblAt, String gugunCd,
			String nanmmbyNm, String noticeBgnde, String noticeEndde, String progrmBgnde, String progrmEndde,
			String progrmRegistNo, String progrmSj, String progrmSttusSe, String sidoCd, String srvcClCode, String url,
			String yngbgsPosblAt, String actWkdy, String progrmCn) {
		this.actBeginTm = actBeginTm;
		this.actEndTm = actEndTm;
		this.actPlace = actPlace;
		this.adultPosblAt = adultPosblAt;
		this.gugunCd = gugunCd;
		this.nanmmbyNm = nanmmbyNm;
		this.noticeBgnde = noticeBgnde;
		this.noticeEndde = noticeEndde;
		this.progrmBgnde = progrmBgnde;
		this.progrmEndde = progrmEndde;
		this.progrmRegistNo = progrmRegistNo;
		this.progrmSj = progrmSj;
		this.progrmSttusSe = progrmSttusSe;
		this.sidoCd = sidoCd;
		this.srvcClCode = srvcClCode;
		this.url = url;
		this.yngbgsPosblAt = yngbgsPosblAt;
		this.actWkdy = actWkdy;
		this.progrmCn = progrmCn;
	}


	//19가지 정보의 게터 세터
	public String getActBeginTm() {
		return actBeginTm;
	}
	public void setActBeginTm(String actBeginTm) {
		this.actBeginTm = actBeginTm;
	}
	public String getActEndTm() {
		return actEndTm;
	}
	public void setActEndTm(String actEndTm) {
		this.actEndTm = actEndTm;
	}
	public String getActPlace() {
		return actPlace;
	}
	public void setActPlace(String actPlace) {
		this.actPlace = actPlace;
	}
	public String getAdultPosblAt() {
		return adultPosblAt;
	}
	public void setAdultPosblAt(String adultPosblAt) {
		this.adultPosblAt = adultPosblAt;
	}
	public String getGugunCd() {
		return gugunCd;
	}
	public void setGugunCd(String gugunCd) {
		this.gugunCd = gugunCd;
	}
	public String getNanmmbyNm() {
		return nanmmbyNm;
	}
	public void setNanmmbyNm(String nanmmbyNm) {
		this.nanmmbyNm = nanmmbyNm;
	}
	public String getNoticeBgnde() {
		return noticeBgnde;
	}
	public void setNoticeBgnde(String noticeBgnde) {
		this.noticeBgnde = noticeBgnde;
	}
	public String getNoticeEndde() {
		return noticeEndde;
	}
	public void setNoticeEndde(String noticeEndde) {
		this.noticeEndde = noticeEndde;
	}
	public String getProgrmBgnde() {
		return progrmBgnde;
	}
	public void setProgrmBgnde(String progrmBgnde) {
		this.progrmBgnde = progrmBgnde;
	}
	public String getProgrmEndde() {
		return progrmEndde;
	}
	public void setProgrmEndde(String progrmEndde) {
		this.progrmEndde = progrmEndde;
	}
	public String getProgrmRegistNo() {
		return progrmRegistNo;
	}
	public void setProgrmRegistNo(String progrmRegistNo) {
		this.progrmRegistNo = progrmRegistNo;
	}
	public String getProgrmSj() {
		return progrmSj;
	}
	public void setProgrmSj(String progrmSj) {
		this.progrmSj = progrmSj;
	}
	public String getProgrmSttusSe() {
		return progrmSttusSe;
	}
	public void setProgrmSttusSe(String progrmSttusSe) {
		this.progrmSttusSe = progrmSttusSe;
	}
	public String getSidoCd() {
		return sidoCd;
	}
	public void setSidoCd(String sidoCd) {
		this.sidoCd = sidoCd;
	}
	public String getSrvcClCode() {
		return srvcClCode;
	}
	public void setSrvcClCode(String srvcClCode) {
		this.srvcClCode = srvcClCode;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getYngbgsPosblAt() {
		return yngbgsPosblAt;
	}
	public void setYngbgsPosblAt(String yngbgsPosblAt) {
		this.yngbgsPosblAt = yngbgsPosblAt;
	}
	public String getActWkdy() {
		return actWkdy;
	}
	public void setActWkdy(String actWkdy) {
		this.actWkdy = actWkdy;
	}
	public String getProgrmCn() {
		return progrmCn;
	}
	public void setProgrmCn(String progrmCn) {
		this.progrmCn = progrmCn;
	}
	
	@Override
	public String toString() {
		return "Vol [actBeginTm=" + actBeginTm + ", actEndTm=" + actEndTm + ", actPlace=" + actPlace + ", adultPosblAt="
				+ adultPosblAt + ", gugunCd=" + gugunCd + ", nanmmbyNm=" + nanmmbyNm + ", noticeBgnde=" + noticeBgnde
				+ ", noticeEndde=" + noticeEndde + ", progrmBgnde=" + progrmBgnde + ", progrmEndde=" + progrmEndde
				+ ", progrmRegistNo=" + progrmRegistNo + ", progrmSj=" + progrmSj + ", progrmSttusSe=" + progrmSttusSe
				+ ", sidoCd=" + sidoCd + ", srvcClCode=" + srvcClCode + ", url=" + url + ", yngbgsPosblAt="
				+ yngbgsPosblAt + ", actWkdy=" + actWkdy + ", progrmCn=" + progrmCn + "]";
	}
	
}
