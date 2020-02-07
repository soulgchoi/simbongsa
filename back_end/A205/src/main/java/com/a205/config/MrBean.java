//package com.a205.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.multipart.commons.CommonsMultipartResolver;
//
//@Configuration
//public class MrBean {
//	
//	@Bean
//	public CommonsMultipartResolver MultipartResolver() {
//		CommonsMultipartResolver cmr = new CommonsMultipartResolver();
//		cmr.setMaxUploadSize(100000000); //약 10MB
//		cmr.setMaxInMemorySize(100000000);
//		cmr.setDefaultEncoding("UTF-8");
//		return cmr;
//	}
//}
