package com.rmit.sept.bk_loginservices.services;




import com.rmit.sept.bk_loginservices.Repositories.UserRepository;
import com.rmit.sept.bk_loginservices.exceptions.ConstraintViolationException;
import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.model.UserType;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    protected final Log logger = LogFactory.getLog(getClass());


    private final UserRepository userRepository;


    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public User saveNewUser(User newUser){

        //Username has to be unique (exception)
        newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));

        newUser.setUsername(newUser.getUsername());
        // User authorities are by default Public
        newUser.setAuthorities(Set.of(UserType.PUBLIC));

        // We don't persist or show the confirmPassword
        newUser.setConfirmPassword("");
        try {
            return userRepository.save(newUser);
        } catch (javax.validation.ConstraintViolationException e) {
            throw e;
        } catch (Exception e){
            logger.error(e);
            throw new ConstraintViolationException("A constraint was not properly validated, the error has been logged.");
        }
    }

    // Do I need a saveNewAdmin for security reasons?
    public User saveNewAdmin(User newAdmin){
        //Username has to be unique (exception)
        // We don't persist or show the confirmPassword
        newAdmin.setPassword(bCryptPasswordEncoder.encode(newAdmin.getPassword()));
        //Username has to be unique (exception)
        newAdmin.setUsername(newAdmin.getUsername());
        // User authorities are by default Public
        newAdmin.setAuthorities(Set.of(UserType.ADMIN));
        // We don't persist or show the confirmPassword
        newAdmin.setConfirmPassword("");
        try {
            return userRepository.save(newAdmin);
        }catch (Exception e){
            logger.error(e);
            throw new ConstraintViolationException("A constraint was not properly validated, the error has been logged.");
        }
    }

    public User getUserById(Long id) throws UsernameNotFoundException {
        User user = userRepository.findById(id).get();
        user.getAuthorities().size();
        if(user==null) throw new UsernameNotFoundException("User not found");
        return user;

    }

    //TODO: implement in case null value in userUpdate
    public User updateUser(Long id, User userUpdate) throws UsernameNotFoundException, ConstraintViolationException {
        try {
            User user = userRepository.findById(id).get();
            user.setLocked(userUpdate.isAccountNonLocked());
            user.setFullName(userUpdate.getFullName());
            user.setUsername(userUpdate.getUsername());
            user.setPassword(bCryptPasswordEncoder.encode(userUpdate.getPassword()));
            user.setAuthorities(userUpdate.getAuthoritiesSet());
            return userRepository.save(user);
        } catch (NoSuchElementException noSuchElementException){
            logger.error(noSuchElementException);
            throw new UsernameNotFoundException("User not found, error has been logged.");
        } catch (Exception e){
            logger.error(e);
            throw new ConstraintViolationException("A constraint was not properly validated, the error has been logged.");
        }
    }
}
