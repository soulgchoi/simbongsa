package com.a205.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Member_detail {
	private int m_id;
	private String m_password;
	private String m_email;
	private String m_bgnTm;
	private String m_endTm;
	private String m_age;
	private String m_userid;
	private String m_address;
	private List<Integer> m_prefer_region;
	private List<Integer> m_prefer_category;
	

}
