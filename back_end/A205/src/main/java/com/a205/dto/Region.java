package com.a205.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Region {
	private Integer r_id;
	private String r_sidoNm;
	private Integer r_sidoCd;
	private String r_gugunNm;
	private Integer r_gugunCd;
	
}
