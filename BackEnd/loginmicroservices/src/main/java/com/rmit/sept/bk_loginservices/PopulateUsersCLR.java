package com.rmit.sept.bk_loginservices;

import com.rmit.sept.bk_loginservices.services.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class PopulateUsersCLR implements CommandLineRunner {

    final UserService userService;

    public PopulateUsersCLR(UserService userService) {
        this.userService = userService;
    }

//    private void createBusinessUser(String username, String fullname, String password, String ABN) {
//        User bUser = new User();
//        BusinessInfo info = new BusinessInfo();
//        bUser.setUsername(username);
//        bUser.setFullName(fullname);
//        bUser.setPassword(password);
//        info.setABN(ABN);
//        bUser.setBusinessInfo(info);
//        userService.saveNewUser(bUser);
//    }

    @Override
    public void run(String...args) {
//        if (Arrays.stream(args).anyMatch(s -> s.equals("POPULATE_BUSINESS"))) {
//            createBusinessUser("books@rmit.au", "RMIT Book Store", "abc123", "ABN123");
//            createBusinessUser("books@monash.au", "Monash Books", "abc123", "ABN123");
//            createBusinessUser("books@unimelb.au", "UniMelb Book Store", "abc123", "ABN123");
//            createBusinessUser("books@swinburne.au", "Books Swinburne", "abc123", "ABN123");
//            createBusinessUser("books@deakin.au", "Deakin Uni Books", "abc123", "ABN123");
//            createBusinessUser("books@mit.au", "MIT Books", "abc123", "ABN123");
//        }
    }
}