package com.rmit.sept.ordermicroservices.web;

import com.rmit.sept.ordermicroservices.security.UserDetails;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticatedPrincipal;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithSecurityContextFactory;

import java.util.Collections;

public class WithMockCustomUserDetailsFactory implements WithSecurityContextFactory<WithMockCustomUserDetails> {
    @Override
    public SecurityContext createSecurityContext(WithMockCustomUserDetails userDetails) {
        SecurityContext context = SecurityContextHolder.createEmptyContext();

        UserDetails principal = new UserDetails();
        principal.setUserId(userDetails.userId());
        context.setAuthentication(new UsernamePasswordAuthenticationToken(
                principal, null, Collections.emptyList()));
        return context;
    }
}
