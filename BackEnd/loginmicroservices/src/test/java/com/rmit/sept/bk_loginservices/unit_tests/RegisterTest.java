package com.rmit.sept.bk_loginservices.unit_tests;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.sept.bk_loginservices.Repositories.UserRepository;
import com.rmit.sept.bk_loginservices.exceptions.CustomResponseEntityExceptionHandler;
import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.web.UserController;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.validation.BeanPropertyBindingResult;

import javax.validation.ConstraintViolationException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
class RegisterTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserController userController;

    @Autowired
    private UserRepository userRepository;

    private User user;

    private BeanPropertyBindingResult errors;

    private final ObjectMapper oMap = new ObjectMapper();

    private final CustomResponseEntityExceptionHandler handler = new CustomResponseEntityExceptionHandler();

    // Some constraint violation exceptions are handled by @ControllerAdvice CustomErrorHandler
    CustomResponseEntityExceptionHandler.APIError catchConstraintViolations() {
        ConstraintViolationException exps = assertThrows(ConstraintViolationException.class, () -> userController.registerUser(user, errors), "constraint violation did not throw");
        ResponseEntity<?> response = handler.handleConstraintViolationException(exps);
        return (CustomResponseEntityExceptionHandler.APIError) response.getBody();
    }

    public static JSONObject getUserWrapper() throws JSONException {
        JSONObject userWrapper = new JSONObject();

        JSONObject user_attributes = new JSONObject();
        user_attributes.put("username", "test212@gmail.coM");
        user_attributes.put("fullName", "test");
        user_attributes.put("password", "123456");
        user_attributes.put("confirmPassword", "123456");

        JSONObject abn = new JSONObject();
        abn.put("abn", "123-456");

        userWrapper.put("user", user_attributes);
        userWrapper.put("businessInfo", abn);
        return userWrapper;
    }

    public static User createUser() {
        User user = new User();
        user.setUsername("test@gmail.com");
        user.setFullName("test");
        user.setPassword("123456");
        user.setConfirmPassword("123456");
        user.setEnabled(true);
        user.setAccountNonLocked(true);
        return user;
    }

    @BeforeEach
    void beforeEach(){
        user = createUser();
        errors = new BeanPropertyBindingResult(user, "user");
    }

    @AfterEach
    void afterEach(){
        userRepository.delete(user);
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
        ResponseEntity<?> response2 = userController.registerUser(newUser, errors);
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

    @Test
    void emptyABN() throws Exception {

        // get user wrapper as json string
        JSONObject userWrapper = getUserWrapper();

        JSONObject businessInfo =  userWrapper.getJSONObject("businessInfo");
        JSONObject username =  userWrapper.getJSONObject("user");
        username.put("username", "test123@gmail.com");
        businessInfo.put("abn", "");

        MvcResult res =  mockMvc.perform(
                        post("/api/users/businessRegister")
                                .content(String.valueOf(userWrapper))
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isBadRequest())
                .andReturn();

        JSONObject content = new JSONObject(res.getResponse().getContentAsString());
        String msg = content.getString("businessInfo.ABN");
        assertEquals("ABN field is required", msg);
    }

    @Test
    void successfulBusinessRegistration() throws Exception {
        JSONObject userWrapper = getUserWrapper();

        mockMvc.perform(
                        post("/api/users/businessRegister")
                                .content(String.valueOf(userWrapper))
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isAccepted());
    }

}
