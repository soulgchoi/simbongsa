package com.a205.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Post {

	String m_id;
	String v_id;
	String p_img;
	String p_content;
	String p_status;
	
}
