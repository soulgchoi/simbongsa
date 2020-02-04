package com.a205.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Vol_Mini {

	String v_id;
	String v_title;
	String v_pStatus;
	String v_pBgnD;
	String v_pEndD;
	String v_mBgnD;
	String v_mEndD;
	String r_id;
	String ca_id;
	String v_Auth;
	
}
