package com.map.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Vol {
	private String v_id;
	private String v_title;
	private String v_organ;
	private String v_pBgnD;
	private String v_pEndD;
	private String v_mBgnD;
	private String v_mEndD;
	private String v_pStatus;
	private String v_location;
	private String v_adult;
	private String v_young;
	private String v_url;
	private String v_bgnTm;
	private String v_endTm;
	private String v_day;
	private String v_wantednum;
	private String v_appnow;
	private String v_wantedtype;
	private String v_detail;
	private int r_id;
	private String ca_id;
	private String v_Auth;
	private String v_x;
	private String v_y;
}
