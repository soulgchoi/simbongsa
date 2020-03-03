package com.a205.model;


import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class  MemberPatchRequest {
	
	private List<String> prefer_region;
	private List<String> prefer_category;
	private String m_bgnTm;
	private String m_endTm;
	private String m_age;

}
