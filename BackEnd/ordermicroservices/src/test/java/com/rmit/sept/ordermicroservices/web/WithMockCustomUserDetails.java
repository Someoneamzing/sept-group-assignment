package com.rmit.sept.ordermicroservices.web;

import org.springframework.security.test.context.support.WithSecurityContext;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
@WithSecurityContext(factory = WithMockCustomUserDetailsFactory.class)
public @interface WithMockCustomUserDetails {
    long userId() default 1;
}
