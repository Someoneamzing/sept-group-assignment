package com.rmit.sept.bk_loginservices.services;

import com.rmit.sept.bk_loginservices.Repositories.UserRepository;
import com.rmit.sept.bk_loginservices.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        exceptionMessages(user);
        return user;
    }


    @Transactional
    public User loadUserById(Long id) throws UsernameNotFoundException  {
        User user = userRepository.findById(id).get();
        exceptionMessages(user);
        return user;

    }

    private void exceptionMessages(User user) {
        if(user==null) throw new UsernameNotFoundException("User not found");
        if (!user.isAccountNonLocked()){
            throw new DisabledException("This account is locked, contact an administrator to unsuspend your account");
        }
        if (!user.isEnabled()) {
            throw new DisabledException("Your Business account has not been activated yet, please wait for an admin to confirm your details");
        }
    }
}
