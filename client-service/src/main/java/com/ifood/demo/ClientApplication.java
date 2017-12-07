package com.ifood.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.ifood.demo.client.Client;
import com.ifood.demo.client.ClientEventHandler;

@SpringBootApplication
@EnableJpaRepositories("com.ifood.demo")

public class ClientApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(ClientApplication.class, args);
	}
	
    @Bean
    ClientEventHandler clientEventHandler() {
        return new ClientEventHandler();
    }
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/clients").allowedOrigins("http://localhost:4200");
            }
        };
    }
    
}
