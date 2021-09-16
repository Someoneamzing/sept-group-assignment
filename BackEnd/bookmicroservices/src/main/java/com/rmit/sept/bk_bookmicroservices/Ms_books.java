package com.rmit.sept.bk_bookmicroservices;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@SpringBootApplication
public class Ms_books {

    public static void main(String[] args) {
        SpringApplication.run(Ms_books.class, args);
    }

    class APIError {
        class Violation {
            public String field;
            public String error;
            public Violation(String field, String error) {
                this.field = field;
                this.error = error;
            }
        }
        public String status = HttpStatus.BAD_REQUEST.toString();
        public List<Violation> violations;
        public APIError(Set<ConstraintViolation<?>> violations) {
            this.violations = new ArrayList<>(violations.size());
            for (ConstraintViolation<?> violation : violations) {
                this.violations.add(new Violation(violation.getPropertyPath().toString(), violation.getMessage()));
            }
        }
    }

    @ControllerAdvice
    class CustomErrorHandler {

        @ResponseStatus(value = HttpStatus.BAD_REQUEST)
        @ExceptionHandler(ConstraintViolationException.class)
        public ResponseEntity<APIError> handleConstraintViolationException(ConstraintViolationException exception, ServletWebRequest webRequest) {
            APIError apiError = new APIError(exception.getConstraintViolations());
            return ResponseEntity.badRequest().body(apiError);
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