package com.a205.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MyFilter {
	private String m_age;
	private String v_pBgnD;
	private String v_pEndD;
	private int v_pstatus;
	private String ca_highNm1;
	private String ca_highNm2;
	private String ca_highNm3;
	private String v_bgnTm;
	private String v_endTm;
	private String r_sidoNm1;
	private String r_gugunNm1;
	private String r_sidoNm2;
	private String r_gugunNm2;
	private String r_sidoNm3;
	private String r_gugunNm3;
	private String vol_title;
	private int listSize;
	private int startList;
	private int m_id;
	private List<String> ca_id;
}
