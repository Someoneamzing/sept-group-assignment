package com.rmit.sept.bk_loginservices.payload;

import com.rmit.sept.bk_loginservices.model.BusinessInfo;

public interface BusinessUser {
    Long getId();

    String getFullName();

    BusinessInfo getBusinessInfo();
}
