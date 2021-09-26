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

    // Some constraint violation exceptions are handled by @ControllerAdvice CustomErrorHandler
    CustomResponseEntityExceptionHandler.APIError catchConstraintViolations() {
        ConstraintViolationException exps = assertThrows(ConstraintViolationException.class, () -> userController.registerUser(user, errors), "constraint violation did not throw");
        ResponseEntity<?> response = handler.handleConstraintViolationException(exps);
        return (CustomResponseEntityExceptionHandler.APIError) response.getBody();
    }

    public static User createUser() {
        User user = new User();
        user.setUsername("test@gmail.com");
        user.setFullName("test");
        user.setPassword("123456");
        user.setConfirmPassword("123456");
        return user;
    }

    @BeforeEach
    void beforeEach(){
        user = createUser();
        errors = new BeanPropertyBindingResult(user, "user");
    }

    @Test
    void successfulRegister() {
        ResponseEntity<?> response = userController.registerUser(user, errors);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("[PUBLIC]", user.getAuthorities().toString());
        assertEquals(1, user.getAuthorities().size());
    }

    @Test
    void usernameMustBeUnique() {
        ResponseEntity<?> response = userController.registerUser(user, errors);
        User newUser = createUser();
        errors = new BeanPropertyBindingResult(newUser, "user1");
        ResponseEntity<?> response2 = userController.registerUser(user, errors);
        assertEquals("Username must be unique", errors.getFieldErrors().get(0).getDefaultMessage());
    }

    @Test
    void passwordLessThanSixCharacters(){
        user.setPassword("12345");
        user.setConfirmPassword("12345");
        ResponseEntity<?> response = userController.registerUser(user, errors);
        assertEquals("Password must be at least 6 characters", errors.getFieldErrors().get(0).getDefaultMessage());
    }

    @Test
    void passwordsDoNotMatch(){
        user.setPassword("123456");
        user.setConfirmPassword("654321");
        ResponseEntity<?> response = userController.registerUser(user, errors);
        assertEquals("Passwords must match", errors.getFieldErrors().get(0).getDefaultMessage());
    }


    @Test
    void fullNameEmpty(){
        user.setFullName("");
        CustomResponseEntityExceptionHandler.APIError v = catchConstraintViolations();
        assertEquals("Please enter your full name", v.violations.get(0).error);
    }

    @Test
    void invalidEmail(){
        user.setUsername("etet2351");
        CustomResponseEntityExceptionHandler.APIError v = catchConstraintViolations();
        assertEquals("Username needs to be an email", v.violations.get(0).error);
    }
}
