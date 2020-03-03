package com.a205.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
	int c_id;
	int m_id;
	int p_id;
	String c_content;
	String c_date;
	String userId;
}
