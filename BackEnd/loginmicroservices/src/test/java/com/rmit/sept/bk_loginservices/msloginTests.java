package com.rmit.sept.bk_loginservices;

import com.rmit.sept.bk_loginservices.Repositories.UserRepository;
import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.model.UserType;
import com.rmit.sept.bk_loginservices.web.UserController;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.Errors;
import org.springframework.web.client.RestTemplate;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class msloginTests {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserController userController;

    @Mock
    private RestTemplate restTemplate;

    private User user;

    private BeanPropertyBindingResult errors;

    @Test
    void contextLoads() {
    }

    @BeforeEach
    void beforeEach(){
        user = new User();
        user.setUsername("test@gmail.com");
        user.setFullName("test");
        user.setPassword("123456");
        user.setConfirmPassword("123456");
        user.setUserType(UserType.PUBLIC);
        errors = new BeanPropertyBindingResult(user, "user");
    }

    @Test
    void inValidUserName(){
        // must create a user inside this function... to test invalid username
        User u = new User();
        u.setUsername("");
        u.setFullName("test");
        u.setPassword("123456");
        u.setUserType(UserType.PUBLIC);
        ResponseEntity<?> response = userController.registerUser(u, errors);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    void emptyFullName(){
        // must create a user inside this function... to test invalid full name
        User u = new User();
        u.setUsername("test2@gmail.com");
        u.setFullName("");
        u.setPassword("123456");
        u.setPassword("123456");
        u.setUserType(UserType.PUBLIC);
        ResponseEntity<?> response = userController.registerUser(u, errors);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    void passwordLessThanSixCharacters(){
        // changing password
        user.setPassword("12345");
        user.setConfirmPassword("12345");
        ResponseEntity<?> response = userController.registerUser(user, errors);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    void passwordsDoNotMatch(){
        // chaning password and confirm password
        user.setPassword("123456");
        user.setConfirmPassword("654321");
        ResponseEntity<?> response = userController.registerUser(user, errors);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

}
