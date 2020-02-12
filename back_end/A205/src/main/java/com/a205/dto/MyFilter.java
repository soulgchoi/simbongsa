package com.a205.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MyFilter {
	private String v_pBgnD;
	private String v_pEndD;
	private int v_pstatus;
	private String ca_highNm;
	private String v_bgnTm;
	private String v_endTm;
	private String r_sidoNm;
	private String r_gugunNm;
	private String vol_title;
	private int listSize;
	private int startList;
	private List<String> ca_id;
}
