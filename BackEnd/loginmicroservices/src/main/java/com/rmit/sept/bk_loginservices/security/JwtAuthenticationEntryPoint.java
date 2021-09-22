package com.rmit.sept.bk_loginservices.security;
import com.google.gson.Gson;
import com.rmit.sept.bk_loginservices.exceptions.ConstraintViolationExceptionResponse;
import com.rmit.sept.bk_loginservices.exceptions.InvalidLoginResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                         AuthenticationException e) throws IOException, ServletException {

        ConstraintViolationExceptionResponse response = new ConstraintViolationExceptionResponse(e.getMessage());
        String jsonResponse = new Gson().toJson(response);


        httpServletResponse.setContentType("application/json");
        httpServletResponse.setStatus(401);
        httpServletResponse.getWriter().print(jsonResponse);


    }
}