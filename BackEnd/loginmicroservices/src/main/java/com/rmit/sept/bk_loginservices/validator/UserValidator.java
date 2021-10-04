package com.rmit.sept.bk_loginservices.validator;

import com.rmit.sept.bk_loginservices.Repositories.UserRepository;
import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class UserValidator implements Validator {

    private final UserRepository userRepository;

    @Autowired
    public UserValidator(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return User.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {

        User user = (User) object;

        // use this prefix string to separate public and business user field errors
        String prefix = errors.getObjectName().equals("userWrapper") ? "user." : "";

        // password length check
        if(user.getPassword().length() < 6){
            errors.rejectValue(prefix + "password","Length", "Password must be at least 6 characters");
        }

        //confirmPassword
        if(!user.getPassword().equals(user.getConfirmPassword())){
            errors.rejectValue(prefix + "confirmPassword","Match", "Passwords must match");
        }

//        confirm unique username
        if (userRepository.existsByUsername(user.getUsername())) {
            errors.rejectValue(prefix + "username", "Unique", "Username must be unique");
        }
    }
}
