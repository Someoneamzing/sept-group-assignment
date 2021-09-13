package com.rmit.sept.bk_loginservices.model;

import com.rmit.sept.bk_loginservices.model.BusinessInfo;
import com.rmit.sept.bk_loginservices.model.User;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

public class UserWrapper {

    @Valid
    User user;

    @Valid
    BusinessInfo businessInfo;

    public User getUser() {
        return user;
    }

    public String getPassword(){
        return this.user.getPassword();
    }

    public void setUser(User user) {
        this.user = user;
    }

    public BusinessInfo getBusinessInfo() {
        return businessInfo;
    }

    public void setBusinessInfo(BusinessInfo businessInfo) {
        this.businessInfo = businessInfo;
    }
}
