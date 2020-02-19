package com.a205.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostView {
	
	String p_id;
	String v_id;
	String p_content;
	String m_id;
	String p_status;
	List<Member> post_vote_members;
	String userId;
	List<String> files;
	public PostView(String v_id, String p_content, String m_id, String p_status, List<String> files) {
		this.v_id = v_id;
		this.p_content = p_content;
		this.m_id = m_id;
		this.p_status = p_status;
		this.files = files;
	}
	
}
