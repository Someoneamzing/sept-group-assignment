package com.rmit.sept.bk_loginservices.unit_tests;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.sept.bk_loginservices.Repositories.UserRepository;
import com.rmit.sept.bk_loginservices.exceptions.CustomResponseEntityExceptionHandler;
import com.rmit.sept.bk_loginservices.model.BusinessInfo;
import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.model.UserType;
import com.rmit.sept.bk_loginservices.model.UserWrapper;
import com.rmit.sept.bk_loginservices.payload.JWTLoginSuccessResponse;
import com.rmit.sept.bk_loginservices.payload.LoginRequest;
import com.rmit.sept.bk_loginservices.security.SecurityConstant;
import com.rmit.sept.bk_loginservices.services.UserService;
import com.rmit.sept.bk_loginservices.web.UserController;
import org.json.JSONException;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import org.json.JSONObject;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BeanPropertyBindingResult;

import javax.validation.ConstraintViolationException;
import java.io.UnsupportedEncodingException;
import java.lang.annotation.Documented;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc
@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class EditTest {
    @Autowired
    private UserController userController;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;

    @Autowired
    private MockMvc mockMvc;

    private User user;

    private User admin;

    private User business;

    private BusinessInfo businessInfo;

    private UserWrapper businessWrapper;

    private BeanPropertyBindingResult errors;

    private LoginRequest request;
    private final ObjectMapper oMap = new ObjectMapper();

    private final CustomResponseEntityExceptionHandler handler = new CustomResponseEntityExceptionHandler();

    // Some constraint violation exceptions are handled by @ControllerAdvice CustomErrorHandler
    CustomResponseEntityExceptionHandler.APIError catchConstraintViolations() {
        ConstraintViolationException exps = assertThrows(ConstraintViolationException.class, () -> userController.registerUser(user, errors), "constraint violation did not throw");
        ResponseEntity<?> response = handler.handleConstraintViolationException(exps);
        return (CustomResponseEntityExceptionHandler.APIError) response.getBody();
    }

    public static String asJsonString(final Object obj) {
        try {
            final ObjectMapper mapper = new ObjectMapper();
            final String jsonContent = mapper.writeValueAsString(obj);
            return jsonContent;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public JWTLoginSuccessResponse publicUserLoginResponse() throws Exception {
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

        return jwtRes;
    }

    public JWTLoginSuccessResponse adminUserLoginResponse() throws Exception {
        request.setUsername("adminTest@gmail.com");
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

        return jwtRes;
    }

    @BeforeEach
    void beforeEach() throws JSONException {
        userRepository.deleteAll();
        request = new LoginRequest();
        user = RegisterTest.createUser();
        userController.registerUser(user, new BeanPropertyBindingResult(user, "login"));
        errors = new BeanPropertyBindingResult(user, "user");
        admin = new User();
        admin.setUsername("adminTest@gmail.com");
        admin.setFullName("adminTest");
        admin.setPassword("123456");
        userService.saveNewAdmin(admin);
        business = new User();
        business.setUsername("businessTest@gmail.com");
        business.setFullName("businessTest");
        business.setPassword("123456");
        business.setConfirmPassword("123456");
        businessInfo = new BusinessInfo();
        businessInfo.setABN("1234");
        businessWrapper = new UserWrapper();
        businessWrapper.setUser(business);
        businessWrapper.setBusinessInfo(businessInfo);
        userController.registerBusinessUser(businessWrapper, new BeanPropertyBindingResult(businessWrapper, "login"));
    }

    @AfterEach
    void afterEach() {
        userRepository.delete(user);
    }

    @Test
    public void userProfileGet() throws Exception {
        JWTLoginSuccessResponse jwtRes = publicUserLoginResponse();
//      with jwt token included
        mockMvc.perform(
                        get("/api/users/userProfile")
                                .accept(MediaType.APPLICATION_JSON)
                                .header(SecurityConstant.HEADER_STRING, jwtRes.getToken())
                )
                .andExpect(status().isOk());
    }

//    @Test
//    public void userProfileGetAuthenticationReject() throws Exception {
//        mockMvc.perform(
//                        get("/api/users/userProfile")
//                                .accept(MediaType.APPLICATION_JSON)
//                )
//                .andExpect(status().isUnauthorized());
//    }

    @Test
    @Transactional
    public void userProfileUpdate() throws Exception {
        JWTLoginSuccessResponse jwtRes = publicUserLoginResponse();

        User updateUser = new User();
        updateUser.setUsername("testtest@gmail.com");
        updateUser.setFullName("testtest");
        updateUser.setPassword("123456");

        //      with jwt token included
        mockMvc.perform(
                        put("/api/users/" + user.getId())
                                .content(asJsonString(updateUser))
                                .contentType(MediaType.APPLICATION_JSON)
                                .header(SecurityConstant.HEADER_STRING, jwtRes.getToken())
                )
                .andExpect(status().isOk());
    }

    @Test
    @Transactional
    public void userProfileUpdateAuthenticationReject() throws Exception {
        JWTLoginSuccessResponse jwtRes = publicUserLoginResponse();

        User updateUser = new User();
        updateUser.setUsername("testtest@gmail.com");
        updateUser.setUsername("testtest");
        updateUser.setPassword("123456");

        //Reject updating different user
        mockMvc.perform(
                        put("/api/users/" + user.getId()+1)
                                .content(asJsonString(updateUser))
                                .contentType(MediaType.APPLICATION_JSON)
                                .header(SecurityConstant.HEADER_STRING, jwtRes.getToken())
                )
                .andExpect(status().isBadRequest());

        //Reject fields that are only updatable by an admin
        mockMvc.perform(
                        put("/api/users/" + user.getId())
                                .content(asJsonString(admin))
                                .contentType(MediaType.APPLICATION_JSON)
                                .header(SecurityConstant.HEADER_STRING, jwtRes.getToken())
                )
                .andExpect(status().isBadRequest());
    }

    @Test
    @Transactional
    public void businessUserUpdate() throws Exception {
        JWTLoginSuccessResponse jwtRes = adminUserLoginResponse();

        User updateUser = new User();
        updateUser.setEnabled(true);
        updateUser.setPassword("12345678");
        updateUser.setFullName("business");
        updateUser.setUsername("business@gmail.com");

        //Reject updating different user
        mockMvc.perform(
                        put("/api/users/" + business.getId())
                                .content(asJsonString(updateUser))
                                .contentType(MediaType.APPLICATION_JSON)
                                .header(SecurityConstant.HEADER_STRING, jwtRes.getToken())
                )
                .andExpect(status().isOk());
    }

    @Test
    @Transactional
    public void userUpdate() throws Exception {
        JWTLoginSuccessResponse jwtRes = adminUserLoginResponse();

        User updateUser = new User();
        updateUser.setAccountNonLocked(false);
        updateUser.setPassword("12345678");
        updateUser.setFullName("usertest");
        updateUser.setUsername("userTest@gmail.com");

        //Reject updating different user
        mockMvc.perform(
                        put("/api/users/" + user.getId())
                                .content(asJsonString(updateUser))
                                .contentType(MediaType.APPLICATION_JSON)
                                .header(SecurityConstant.HEADER_STRING, jwtRes.getToken())
                )
                .andExpect(status().isOk());
    }
}
