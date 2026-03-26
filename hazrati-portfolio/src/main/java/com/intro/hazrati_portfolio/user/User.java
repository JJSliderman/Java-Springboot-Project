package com.intro.hazrati_portfolio.user;

import jakarta.persistence.Entity;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import java.util.Collection;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Table(name="user", schema="public")
//public class User implements UserDetails
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", nullable=false)
    private Long id;
    @Column(name="username", unique=true, nullable=false)
    private String username;
    @Column(name="name")
    private String name;
    @Column(name="password", nullable=false)
    private String password;
    @Column(name="age")
    private Integer age;
    /*@Column(name="authorities")
    private Collection<? extends GrantedAuthority> authorities;
    @Column(name="enabled", nullable=false)
    private boolean enabled = true;
    @Column(name="accountNonExpired")
    private boolean accountNonExpired;
    @Column(name="accountNonLocked")
    private boolean accountNonLocked;
    @Column(name="credentialsNonExpired")
    private boolean credentialsNonExpired; */

    public User() {
    }

    public User(String username, String name, String password, Integer age) {
        this.username = username;
        this.name = name;
        this.password = password;
        this.age = age;
    }

    /* public User(String username, String name, String password, Integer age, Collection<? extends GrantedAuthority> authorities) {
        this.username = username;
        this.name = name;
        this.password = password;
        this.age = age;
        this.authorities = authorities;
    }

    public User(String username, String password, Collection<? extends GrantedAuthority> authorities) {
        this.username = username;
        this.password = password;
        this.authorities = authorities;
    } */

    public User(String username, String name, String password) {
        this.username = username;
        this.name = name;
        this.password = password;
    }

    /* public User(String username, String name, String password, Collection<? extends GrantedAuthority> authorities) {
        this.username = username;
        this.name = name;
        this.password = password;
        this.authorities = authorities;
    } */

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public User(String username, Integer age, String password) {
        this.username = username;
        this.age = age;
        this.password = password;
    }

    /* public User(String username, Integer age, String password, Collection<? extends GrantedAuthority> authorities) {
        this.username = username;
        this.age = age;
        this.password = password;
        this.authorities = authorities;
    } */

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    //@Override
    public String getPassword() {
        return password;
    }

    /* @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    } */

    public void setPassword(String password) {
        this.password = password;
    }

    // @Override
    public String getUsername() {
        return username;
    }

    /* @Override
    public boolean isAccountNonExpired() {
        return accountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return credentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    } */

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Long getId() { 
        return id; 
    }

    public void setId(Long id) { 
        this.id = id; 
    }
}