package com.rmit.sept.bk_loginservices.exceptions;

public class ConstraintViolationExceptionResponse {

    private String message;

    public ConstraintViolationExceptionResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}