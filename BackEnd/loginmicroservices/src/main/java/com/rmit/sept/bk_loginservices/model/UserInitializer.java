package com.rmit.sept.bk_loginservices.model;

import com.rmit.sept.bk_loginservices.Repositories.UserRepository;
import com.rmit.sept.bk_loginservices.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class UserInitializer implements CommandLineRunner {

    @Autowired
    UserService userService;

    @Override
    public void run(String...args) throws Exception {
        User admin = new User();
        admin.setId(1L);
        admin.setFullName("admin");
        admin.setUsername("admin@gmail.com");
        admin.setPassword("admin");
        admin.setAccountNonLocked(true);
        admin.setEnabled(true);
        userService.saveNewAdmin(admin);
    }
}