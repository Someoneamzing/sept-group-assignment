package com.rmit.sept.bk_loginservices.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.validator.constraints.UniqueElements;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import static org.springframework.security.core.authority.AuthorityUtils.authorityListToSet;


@Entity
public class User implements UserDetails {
    private static final long serialVersionUID = 6529685098267757690L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Email(message = "Username needs to be an email")
    @NotBlank(message = "username is required")
    @Column(unique = true)
    private String username;
    @NotBlank(message = "Please enter your full name")
    private String fullName;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotBlank(message = "Password field is required")
    private String password;
    @Transient
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String confirmPassword;
    private Date create_At;
    private Date update_At;
    @Embedded
    private BusinessInfo businessInfo;

    @ElementCollection
    @UniqueElements
    private Collection<String> authorities = new HashSet<>();
    private Boolean AccountNonLocked = true;
    private Boolean enabled = true;

    public User() {
    }

    public BusinessInfo getBusinessInfo() {
        return businessInfo;
    }

    public void setBusinessInfo(BusinessInfo businessInfo) {
        this.businessInfo = businessInfo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @JsonIgnore
    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public Date getCreate_At() {
        return create_At;
    }

    public void setCreate_At(Date create_At) {
        this.create_At = create_At;
    }

    public Date getUpdate_At() {
        return update_At;
    }

    public void setUpdate_At(Date update_At) {
        this.update_At = update_At;
    }

    @PrePersist
    protected void onCreate() {
        this.create_At = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.update_At = new Date();
    }

//    public boolean isActive() {
//        return active;
//    }
//
//    public void setActive(boolean active) {
//        this.active = active;
//    }

    /*
    UserDetails interface methods
     */

    @Transactional
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toSet());
    }

    @JsonIgnore
    public Set<String> getAuthoritiesSet() {
        return this.authorities.stream().map(String::new).collect(Collectors.toSet());
    }

    public void setAuthorities(Set<String> authorities) {
        this.authorities = authorities;
    }

    public void setAuthoritiesByCollection(Collection<? extends GrantedAuthority> authorities) {
        this.authorities = authorityListToSet(authorities);
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore
    public Boolean isAccountNonLockedBool() {
        return this.AccountNonLocked;
    }

    public void setAccountNonLocked(boolean AccountNonLocked) {
        this.AccountNonLocked = AccountNonLocked;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.AccountNonLocked;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }

    @JsonIgnore
    public Boolean isEnabledBool() {
        return this.enabled;
    }

    public void setEnabled(boolean enabled) { this.enabled = enabled; }
}