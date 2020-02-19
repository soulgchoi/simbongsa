//package com.a205.config;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.ApplicationContext;
//import org.springframework.context.annotation.Bean;
//import org.springframework.web.servlet.view.InternalResourceViewResolver;
//import org.thymeleaf.TemplateEngine;
//import org.thymeleaf.spring5.ISpringTemplateEngine;
//import org.thymeleaf.spring5.SpringTemplateEngine;
//import org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver;
//import org.thymeleaf.spring5.view.ThymeleafViewResolver;
//import org.thymeleaf.templatemode.TemplateMode;
//import org.thymeleaf.templateresolver.ITemplateResolver;
//
//public class ViewResolver {
//	@Autowired
//	private ApplicationContext applicationContext;
//
//	@Bean
//	public ViewResolver getViewResolver() {
//
//		InternalResourceViewResolver resolver = new InternalResourceViewResolver();
//
//		resolver.setPrefix("/WEB-INF/views/");
//
//		resolver.setSuffix(".jsp");
//
//		resolver.setViewNames("jsp/*");
//
//		return resolver;
//
//	}
//
//	@Bean
//	public ViewResolver viewResolver() {
//
//		ThymeleafViewResolver resolver = new ThymeleafViewResolver();
//
//		resolver.setTemplateEngine((ISpringTemplateEngine) templateEngine());
//
//		resolver.setCharacterEncoding("UTF-8");
//
//		return resolver;
//
//	}
//
//	@Bean
//	public TemplateEngine templateEngine() {
//
//		SpringTemplateEngine engine = new SpringTemplateEngine();
//
//		engine.setEnableSpringELCompiler(true);
//
//		engine.setTemplateResolver(templateResolver());
//
//		return engine;
//
//	}
//
//	private ITemplateResolver templateResolver() {
//
//		SpringResourceTemplateResolver resolver = new SpringResourceTemplateResolver();
//
//		resolver.setApplicationContext(applicationContext);
//
//		resolver.setPrefix("/WEB-INF/views/");
//
//		resolver.setSuffix(".html");
//
//		resolver.setTemplateMode(TemplateMode.HTML);
//
//		return resolver;
//
//	}
//
//}
