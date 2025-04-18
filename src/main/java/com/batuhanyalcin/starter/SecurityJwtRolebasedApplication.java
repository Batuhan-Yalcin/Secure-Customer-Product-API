package com.batuhanyalcin.starter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = {"com.batuhanyalcin"})
@ComponentScan(basePackages = {"com.batuhanyalcin"})
@EntityScan(basePackages = {"com.batuhanyalcin"})
 public class SecurityJwtRolebasedApplication {

	public static void main(String[] args) {
		SpringApplication.run(SecurityJwtRolebasedApplication.class, args);
	}

}
