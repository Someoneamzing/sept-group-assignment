package com.rmit.sept.bk_loginservices;

import com.rmit.sept.bk_loginservices.Repositories.UserRepository;
import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.model.UserType;
import com.rmit.sept.bk_loginservices.web.UserController;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BeanPropertyBindingResult;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class IntegrationTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserController userController;

    private User user;

    private BeanPropertyBindingResult errors;

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
    void createUser(){
        ResponseEntity<?> response = userController.registerUser(user, errors);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
    }

}
