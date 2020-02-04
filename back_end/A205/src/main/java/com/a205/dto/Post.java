package com.a205.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Post {

	String p_id;
	String p_date;
	String m_id;
	String p_img;
	String v_id;
	String p_status;
	String p_content;
	
}
