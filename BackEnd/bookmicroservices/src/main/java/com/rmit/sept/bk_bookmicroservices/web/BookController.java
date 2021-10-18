package com.rmit.sept.bk_bookmicroservices.web;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/books")
public class BookController {

    @SuppressWarnings("SpringElInspection")
    @Value("#{environment.CIRCLE_BRANCH_SHA1}")
    private String branchSha1;
    @GetMapping("/version")
    public String version() {
        return branchSha1;
    }
}
