package com.a205.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Category {
	private Integer ca_id;
	private String ca_highCd;
	private String ca_highNm;
	private String ca_lowCd;
	private String ca_lowNm;

}
