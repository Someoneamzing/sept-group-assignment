package com.rmit.sept.bk_loginservices.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.validation.ConstraintViolation;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@ControllerAdvice
@RestController
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    public static class APIError {
        public static class Violation {
            public String field;
            public String error;
            public Violation(String field, String error) {
                this.field = field;
                this.error = error;
            }
        }
        public List<Violation> violations;
        public APIError(Set<ConstraintViolation<?>> violations) {
            this.violations = new ArrayList<>(violations.size());
            for (ConstraintViolation<?> violation : violations) {
                this.violations.add(new Violation(violation.getPropertyPath().toString(), violation.getMessage()));
            }
        }
    }

    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ExceptionHandler(javax.validation.ConstraintViolationException.class)
    public ResponseEntity<APIError> handleConstraintViolationException(javax.validation.ConstraintViolationException exception) {
        APIError apiError = new APIError(exception.getConstraintViolations());
        return ResponseEntity.badRequest().body(apiError);
    }


    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ConstraintViolationException.class)
    public final ResponseEntity<Object> handleCustomConstraintViolationException(ConstraintViolationException ex){
        ConstraintViolationExceptionResponse exceptionResponse = new ConstraintViolationExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }
}

