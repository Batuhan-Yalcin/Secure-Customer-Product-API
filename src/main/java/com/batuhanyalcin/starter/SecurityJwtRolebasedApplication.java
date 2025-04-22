package com.batuhanyalcin.starter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EnableJpaRepositories(basePackages = {"com.batuhanyalcin"})
@ComponentScan(basePackages = {"com.batuhanyalcin"})
@EntityScan(basePackages = {"com.batuhanyalcin"})
public class SecurityJwtRolebasedApplication {

	public static void main(String[] args) {
		SpringApplication.run(SecurityJwtRolebasedApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins("http://localhost:3000")
						.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
						.allowedHeaders("Authorization", "Content-Type", "X-Requested-With")
						.allowCredentials(true)
						.maxAge(3600);
			}
		};
	}
}
