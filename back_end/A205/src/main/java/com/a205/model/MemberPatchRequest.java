package com.a205.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class  MemberPatchRequest {
	
	private String prefer_region;
	private String prefer_category;
	private String m_bgnTm;
	private String m_endTm;
	private String m_age;

}

