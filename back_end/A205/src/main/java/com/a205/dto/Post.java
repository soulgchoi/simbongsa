package com.a205.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Post {
	
	String p_id;
	String v_id;
	String p_content;
	String m_id;
	String p_status;
	public Post(String v_id, String p_content, String m_id, String p_status) {
		this.v_id = v_id;
		this.p_content = p_content;
		this.m_id = m_id;
		this.p_status = p_status;
	}
	
	
	
}
