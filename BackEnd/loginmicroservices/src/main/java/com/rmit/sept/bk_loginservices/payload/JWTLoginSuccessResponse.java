package com.rmit.sept.bk_loginservices.payload;

import com.rmit.sept.bk_loginservices.model.User;

import java.util.Collection;

public class JWTLoginSuccessResponse {
    private Collection<String> authorities;
    private boolean success;
    private String token;

    public JWTLoginSuccessResponse(){};

    public JWTLoginSuccessResponse(boolean success, String token, Collection<String> authorities) {
        this.success = success;
        this.token = token;
        this.authorities = authorities;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Collection<String> getAuthorities() { return this.authorities; }

    @Override
    public String toString() {
        return "JWTLoginSuccessResponse{" +
                "success=" + success +
                ", token='" + token + '\'' +
                '}';
    }
}
