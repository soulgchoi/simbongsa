package com;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
	
	@Bean
	public Docket api() {
		return new Docket(DocumentationType.SWAGGER_2)
				.groupName("Customer Management")	// select a spec
				.apiInfo(info())
				.select()//Initiates a builder for api selection.
				.apis(RequestHandlerSelectors.basePackage("com.rest.controller")) //해당 패키지에서 RestController를 뽑아서 입출력해줌
				//.paths(PathSelectors.any())
				//.paths(PathSelectors.ant("/customers/**")) // /customers/로 시작하는 들어오는 요청에 대해서 문서화 작업
				.build();

	}

	private ApiInfo info() { //내맘대로
		return new ApiInfoBuilder().title("Customer Management API")
				.description("<h1>Customer Management</h1>")
				.license("ssafy")
				.version("2.0")
				.build();
	}
	
}
