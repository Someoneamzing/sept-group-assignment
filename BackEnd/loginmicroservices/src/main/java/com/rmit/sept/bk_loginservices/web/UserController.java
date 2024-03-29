package com.rmit.sept.bk_loginservices.web;


import com.rmit.sept.bk_loginservices.Repositories.UserRepository;
import com.rmit.sept.bk_loginservices.model.BusinessInfo;
import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.model.UserWrapper;
import com.rmit.sept.bk_loginservices.payload.JWTLoginSuccessResponse;
import com.rmit.sept.bk_loginservices.payload.LoginRequest;
import com.rmit.sept.bk_loginservices.security.JwtTokenProvider;
import com.rmit.sept.bk_loginservices.services.CustomUserDetailsService;
import com.rmit.sept.bk_loginservices.services.MapValidationErrorService;
import com.rmit.sept.bk_loginservices.services.UserService;
import com.rmit.sept.bk_loginservices.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.stream.Collectors;

import static com.rmit.sept.bk_loginservices.security.SecurityConstant.TOKEN_PREFIX;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final MapValidationErrorService mapValidationErrorService;

    private final UserService userService;

    private final UserRepository userRepository;
    
    private final UserValidator userValidator;

    private final JwtTokenProvider tokenProvider;

    private final AuthenticationManager authenticationManager;

    private final CustomUserDetailsService customUserDetailsService;

    @Autowired
    public UserController(MapValidationErrorService mapValidationErrorService, UserService userService, UserRepository userRepository, UserValidator userValidator, JwtTokenProvider tokenProvider, AuthenticationManager authenticationManager, CustomUserDetailsService customUserDetailsService) {
        this.mapValidationErrorService = mapValidationErrorService;
        this.userService = userService;
        this.userRepository = userRepository;
        this.userValidator = userValidator;
        this.tokenProvider = tokenProvider;
        this.authenticationManager = authenticationManager;
        this.customUserDetailsService = customUserDetailsService;
    }

    @SuppressWarnings("SpringElInspection")
    @Value("#{environment.CIRCLE_BRANCH_SHA1}")
    private String branchSha1;
    @GetMapping("/version")
    public String version() {
        return branchSha1;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/")
    public Iterable<User> allUsers(){
        return this.userRepository.findAll();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/{userid}")
    public ResponseEntity<User> getUser(@PathVariable("userid") long userid)
    {
        return new ResponseEntity<>(userService.getUserById(userid), HttpStatus.OK);
    }

    @PutMapping("/{userid}")
    public ResponseEntity<?> updateUser(@PathVariable("userid") long userid ,@RequestBody User user, BindingResult result) throws IllegalAccessException {
        userValidator.validateUpdate(user,result);
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null)return errorMap;

        userService.updateUser(userid, user);
        return new ResponseEntity<>(userService.getUserById(userid), HttpStatus.OK);
    }

    @GetMapping("/userProfile")
    public ResponseEntity<?> currentUser() throws IllegalAccessException {
        User loggedInUser = ((User)SecurityContextHolder.getContext().getAuthentication().getPrincipal());

        return new ResponseEntity<>(userService.getUserById(loggedInUser.getId()), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result){
        // Validate passwords match
        userValidator.validate(user,result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null)return errorMap;

        User newUser = userService.saveNewUser(user, false);

        return  new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PostMapping("/businessRegister")
    public ResponseEntity<?> registerBusinessUser(@Valid @RequestBody UserWrapper userInfo, BindingResult result){
        // save business info for user
        User user = userInfo.getUser();
        BusinessInfo businessInfo = userInfo.getBusinessInfo();
        user.setBusinessInfo(businessInfo);

        // Validate passwords match
        userValidator.validate(user, result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null)return errorMap;

        User newUser = userService.saveNewUser(user, true);

        return new ResponseEntity<>(newUser, HttpStatus.ACCEPTED);
    }

    @GetMapping("/my_authorities")
    public String myAuthorities(){
        return SecurityContextHolder.getContext().getAuthentication().getAuthorities().toString();
    }


    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

//        is this required? JwtAuthenticationFilter already does this on secured routes
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX +  tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JWTLoginSuccessResponse(true, jwt, authentication.getAuthorities().stream().map(GrantedAuthority::toString).collect(Collectors.toSet())));
    }
}
