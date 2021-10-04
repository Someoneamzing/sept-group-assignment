package com.rmit.sept.bk_loginservices.model;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotBlank;

@Embeddable
public class BusinessInfo {
    @NotBlank(message = "ABN field is required")
    private String ABN;

    public String getABN() {
        return ABN;
    }

    public void setABN(String ABN) {
        this.ABN = ABN;
    }
}
