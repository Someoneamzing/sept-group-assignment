package com.rmit.sept.bk_bookmicroservices.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import static com.rmit.sept.bk_bookmicroservices.MsBooks.LOGGER;

@Configuration
@EnableWebSecurity
/**
 * Basic Security Configuration
 */
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    /**
     * Configured to allow all requests, permit iframes, enable CORS and disable CSRF
     */
    protected void configure(HttpSecurity http) throws Exception {
        LOGGER.info("Configuring SpringSecurity");
        http.authorizeRequests().anyRequest().permitAll()
                .and().headers().frameOptions().sameOrigin()
                .and().cors().and().csrf().disable();
    }

    @Autowired
    /**
     * Disables authentication and grants everyone USER role, with `user` and `password` as their credentials.
     * This is for testing purposes only as authentication and roles have not been implemented.
     */
    public void ConfigureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        LOGGER.info("Disabling Authentication.");
        auth.inMemoryAuthentication().passwordEncoder(NoOpPasswordEncoder.getInstance()).withUser("user").password("password").roles("USER");
    }
}
