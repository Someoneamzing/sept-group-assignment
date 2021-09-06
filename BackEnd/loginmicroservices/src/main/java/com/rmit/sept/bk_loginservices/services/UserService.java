package com.rmit.sept.bk_loginservices.services;




import com.rmit.sept.bk_loginservices.Repositories.UserRepository;
import com.rmit.sept.bk_loginservices.Repositories.UserTypeRepository;
import com.rmit.sept.bk_loginservices.exceptions.ConstraintViolationException;
import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.model.UserType;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Service
public class UserService {

    protected final Log logger = LogFactory.getLog(getClass());


    private final UserRepository userRepository;

    private final UserTypeRepository userTypeRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, UserTypeRepository userTypeRepository) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userTypeRepository = userTypeRepository;
    }

    public User saveNewUser(User newUser){

        //Username has to be unique (exception)
        // We don't persist or show the confirmPassword
        newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
        //Username has to be unique (exception)
        newUser.setUsername(newUser.getUsername());
        // User authorities are by default none
        Set<UserType> auths = new HashSet<>();
        auths.add(userTypeRepository.getPublic());
        newUser.setAuthorities(auths);
        // We don't persist or show the confirmPassword
        newUser.setConfirmPassword("");
        try {
        return userRepository.save(newUser);
        }catch (Exception e){
            logger.error(e);
            throw new ConstraintViolationException("A constraint was not properly validated, the error has been logged.");
        }
    }
}
