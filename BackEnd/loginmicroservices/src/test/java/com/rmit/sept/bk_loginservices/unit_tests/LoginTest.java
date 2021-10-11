package com.rmit.sept.bk_loginservices.unit_tests;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.sept.bk_loginservices.Repositories.UserRepository;
import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.payload.JWTLoginSuccessResponse;
import com.rmit.sept.bk_loginservices.payload.LoginRequest;
import com.rmit.sept.bk_loginservices.security.SecurityConstant;
import com.rmit.sept.bk_loginservices.web.UserController;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.validation.BeanPropertyBindingResult;

import java.util.Set;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc
@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class LoginTest {

    @Autowired
    private UserController userController;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MockMvc mockMvc;

    private User user;

    private LoginRequest request;
    private final ObjectMapper oMap = new ObjectMapper();

    @BeforeEach
    void beforeEach(){
        userRepository.deleteAll();
        request = new LoginRequest();
        user = RegisterTest.createUser();
        userController.registerUser(user, new BeanPropertyBindingResult(user, "login"));
    }

    @AfterEach
    void afterEach() {
        userRepository.delete(user);
    }

    @Test
    void successfulLoginAndAuthorizedAccess() throws Exception {
//        test login
        request.setUsername("test@gmail.com");
        request.setPassword("123456");
        String rj = oMap.writeValueAsString(request);
        MvcResult rt = mockMvc.perform(
                        post("/api/users/login")
                                .content(rj)
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andReturn();
        String json = rt.getResponse().getContentAsString();
        JWTLoginSuccessResponse jwtRes = oMap.readValue(json, JWTLoginSuccessResponse.class);
//      with jwt token included
        mockMvc.perform(
                        get("/api/users/my_authorities")
                                .accept(MediaType.APPLICATION_JSON)
                                .header(SecurityConstant.HEADER_STRING, jwtRes.getToken())
                )
                .andExpect(jsonPath("$[0]").value("PUBLIC"));
//      accessing resource requiring elevated privileges
        mockMvc.perform(
                get("/api/users/")
                        .accept(MediaType.APPLICATION_JSON)
                        .header(SecurityConstant.HEADER_STRING, jwtRes.getToken())
                )
                .andExpect(status().isForbidden())
//                I don't know why but in testing it's nothing but in dev/prod it's a full JSON object
                .andExpect(content().string(""));

//      Elevating the user's privileges allows access
        user.setAuthorities(Set.of("ADMIN"));
        userRepository.save(user);
        mockMvc.perform(
                        get("/api/users/")
                                .accept(MediaType.APPLICATION_JSON)
                                .header(SecurityConstant.HEADER_STRING, jwtRes.getToken())
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].username").value("test@gmail.com"));
    }

    @Test
    void failedLoginAttempts() throws Exception {
        // bad password
        request.setUsername("test@gmail.com");
        request.setPassword("123456_BAD");
        mockMvc.perform(
                        post("/api/users/login")
                                .content(oMap.writeValueAsString(request))
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.message").value("Bad credentials"));

        // bad input
        request.setUsername("");
        request.setPassword("");
        mockMvc.perform(
                        post("/api/users/login")
                                .content(oMap.writeValueAsString(request))
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.username").value("Username cannot be blank"))
                .andExpect(jsonPath("$.password").value("Password cannot be blank"));


        // no input
        mockMvc.perform(
                        post("/api/users/login")
                )
                .andExpect(status().isBadRequest())
                .andExpect(content().string(""));
    }

    @Test void unauthorizedAccess() throws Exception {
        //      without jwt token included
        mockMvc.perform(
                        get("/api/users/my_authorities")
                                .accept(MediaType.APPLICATION_JSON)
//                                .header(SecurityConstant.HEADER_STRING, jwtRes.getToken())
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0]").value("ROLE_ANONYMOUS"));

//      Accessing admin resource without any authentication
        mockMvc.perform(
                        get("/api/users/")
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.message").value("Full authentication is required to access this resource"));
    }
}


