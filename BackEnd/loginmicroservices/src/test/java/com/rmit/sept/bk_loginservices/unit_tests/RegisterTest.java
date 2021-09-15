package com.rmit.sept.bk_loginservices.unit_tests;

import com.rmit.sept.bk_loginservices.exceptions.CustomResponseEntityExceptionHandler;
import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.web.UserController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BeanPropertyBindingResult;

import javax.validation.ConstraintViolationException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
class RegisterTest {

    @Autowired
    private UserController userController;

    private User user;

    private BeanPropertyBindingResult errors;

    private final CustomResponseEntityExceptionHandler handler = new CustomResponseEntityExceptionHandler();

    @BeforeEach
    void beforeEach(){
        user = new User();
        user.setUsername("test@gmail.com");
        user.setFullName("test");
        user.setPassword("123456");
        user.setConfirmPassword("123456");

        errors = new BeanPropertyBindingResult(user, "user");
    }

    @Test
    void passwordLessThanSixCharacters(){
        user.setPassword("12345");
        user.setConfirmPassword("12345");
        ResponseEntity<?> response = userController.registerUser(user, errors);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    void passwordsDoNotMatch(){
        user.setPassword("123456");
        user.setConfirmPassword("654321");
        ResponseEntity<?> response = userController.registerUser(user, errors);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());

    }

    @Test
    void userName(){
        user.setFullName("");
//        constraint violations are handled by @ControllerAdvice CustomErrorHandler
        ConstraintViolationException excps = assertThrows(ConstraintViolationException.class, () -> userController.registerUser(user, errors), "constraint violation did not throw");
        ResponseEntity<?> response = handler.handleConstraintViolationException(excps);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        CustomResponseEntityExceptionHandler.APIError violations = (CustomResponseEntityExceptionHandler.APIError) response.getBody();
        assertEquals(1, violations.violations.size());
        CustomResponseEntityExceptionHandler.APIError.Violation v = violations.violations.get(0);
        assertEquals("Please enter your full name", v.error);
    }

    @Test
    void inValidUserName(){
        user.setUsername("etet2351");
//        constraint violations are handled by @ControllerAdvice CustomErrorHandler
        ConstraintViolationException excps = assertThrows(ConstraintViolationException.class, () -> userController.registerUser(user, errors), "constraint violation did not throw");
        ResponseEntity<?> response = handler.handleConstraintViolationException(excps);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        CustomResponseEntityExceptionHandler.APIError violations = (CustomResponseEntityExceptionHandler.APIError) response.getBody();
        assertEquals(1, violations.violations.size());
        CustomResponseEntityExceptionHandler.APIError.Violation v = violations.violations.get(0);
        assertEquals("Username needs to be an email", v.error);
    }


}
