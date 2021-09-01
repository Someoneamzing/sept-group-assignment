package com.rmit.sept.bk_loginservices.model;

import javax.persistence.Embeddable;

@Embeddable
public class BusinessInfo {

    private String ABN;

    public String getABN() {
        return ABN;
    }

    public void setABN(String ABN) {
        this.ABN = ABN;
    }
}
