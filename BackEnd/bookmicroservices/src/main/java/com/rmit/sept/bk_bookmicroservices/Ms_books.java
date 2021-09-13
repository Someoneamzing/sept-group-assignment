package com.rmit.sept.bk_bookmicroservices;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.validation.ConstraintViolationException;
import java.io.IOException;

@SpringBootApplication
public class Ms_books {

    public static void main(String[] args) {
        SpringApplication.run(Ms_books.class, args);
    }

    @ControllerAdvice
    class CustomErrorHandler {

        @ExceptionHandler(ConstraintViolationException.class)
        public void handleConstraintViolationException(ConstraintViolationException exception,
                                                       ServletWebRequest webRequest) throws IOException {
            webRequest.getResponse().sendError(HttpStatus.BAD_REQUEST.value(), exception.getMessage());
        }
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**");
            }
        };
    }
}