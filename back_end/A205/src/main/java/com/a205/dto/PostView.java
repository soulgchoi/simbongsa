package com.a205.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostView {
	String v_id;
	String p_content;
	String m_id;
	String p_status;
	List<String> files;
}
