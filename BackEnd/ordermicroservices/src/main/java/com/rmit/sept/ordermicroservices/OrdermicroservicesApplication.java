package com.rmit.sept.ordermicroservices;

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
public class OrdermicroservicesApplication {

    public static void main(String[] args) {
        SpringApplication.run(OrdermicroservicesApplication.class, args);
    }

    /**
     * Class that represents an error to be sent to the Client side for violations of the API validation. Aggregates multiple violations.
     */
    class APIError {
        /**
         * A POJO for storing info about a validation violation on a field in an API request.
         */
        class Violation {
            public String field; // The name of the field the violation applies to
            public String error; // The description of the error
            public Violation(String field, String error) {
                this.field = field;
                this.error = error;
            }
        }
        public List<Violation> violations; // The list of aggregated violations in this error.

        /**
         * Constructs an APIError with the given violations
         * @param violations The violations to initialise the API error with.
         */
        public APIError(Set<ConstraintViolation<?>> violations) {
            this.violations = new ArrayList<>(violations.size());
            for (ConstraintViolation<?> violation : violations) {
                this.violations.add(new Violation(violation.getPropertyPath().toString(), violation.getMessage()));
            }
        }
    }

    @ControllerAdvice
    /**
     * Global ConstraintViolationException handler for the app to ensure consistent error responses.
     */
    class CustomErrorHandler {

        @ResponseStatus(value = HttpStatus.BAD_REQUEST)
        @ExceptionHandler(ConstraintViolationException.class)
        /**
         * Converts the caught constraint violation to an APIError and sends that as the response
         */
        public ResponseEntity<APIError> handleConstraintViolationException(ConstraintViolationException exception, ServletWebRequest webRequest) {
            APIError apiError = new APIError(exception.getConstraintViolations());
            return ResponseEntity.badRequest().body(apiError);
        }
    }

    @Bean
    /**
     * Global CORS configuration for the service.
     */
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**"); // Adds all paths to CORS.
            }
        };
    }
}
