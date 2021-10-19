package org.perscholas.podcaster;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.convert.DataSizeUnit;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.servlet.MultipartConfigElement;
import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;

@SpringBootApplication
public class PodcasterApplication {

	public static void main(String[] args) {
		SpringApplication.run(PodcasterApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins("http://localhost:4200")
						.allowedMethods("GET" ,"POST" ,"DELETE" ,"PUT");
				//registry.addMapping("/greeting-javaconfig").allowedOrigins("http://localhost:8080");
			}
		};
	}

	@Bean(name = "multipartResolver")
    public CommonsMultipartResolver multipartResolver() {
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
        multipartResolver.setMaxUploadSize(1000000000);
        multipartResolver.setPreserveFilename(true);
		multipartResolver.setSupportedMethods("POST","PUT");
        return multipartResolver;
    }

	/*@Bean
	public MultipartResolver multipartResolver() {
		return new StandardServletMultipartResolver() {
			@Override
			public boolean isMultipart(HttpServletRequest request) {
				String method = request.getMethod().toLowerCase();
				//By default, only POST is allowed. Since this is an 'update' we should accept PUT.
				if (!Arrays.asList("put", "post").contains(method)) {
					return false;
				}
				String contentType = request.getContentType();
				return (contentType != null &&contentType.toLowerCase().startsWith("multipart/"));
			}

		};
	}*/


}

