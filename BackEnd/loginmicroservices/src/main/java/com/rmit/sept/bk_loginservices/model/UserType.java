package com.rmit.sept.bk_loginservices.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.validator.constraints.UniqueElements;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

public class UserType {
    public enum ROLE {
        BUSINESS,
        ADMIN,
        PUBLIC,
    }

    public static final String ADMIN = ROLE.ADMIN.name();
    public static final String BUSINESS = ROLE.BUSINESS.name();
    public static final String PUBLIC = ROLE.PUBLIC.name();
}
