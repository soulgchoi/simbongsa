package com.map;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.map.api.KakaoRestAPI;
import com.map.api.KakaoRestAPIExecutor;
import com.map.dto.Location;
import com.map.dto.Region;
import com.map.service.RegionService;
import com.map.type.KakaoRestAPIType;
import com.map.util.HttpConnectUtil;

@SpringBootApplication
@EnableTransactionManagement
public class Main implements WebMvcConfigurer {
	
    public static void main(String[] args) {
    	SpringApplication.run(Main.class, args);
	}
    
    @Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
	
		registry.addResourceHandler("/**").addResourceLocations("/resources/");
		registry.addResourceHandler("swagger-ui.html").addResourceLocations("classpath:/META-INF/resources/");
		registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");

	}
}