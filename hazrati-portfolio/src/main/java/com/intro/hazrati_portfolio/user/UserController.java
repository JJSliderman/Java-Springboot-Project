package com.intro.hazrati_portfolio.user;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping(path="api/v1/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/greet")
    public String greet(@RequestParam(defaultValue = "World") String name) {
        return "Hello, " + name + "!";
    }

    @GetMapping("/retrieve")
    public List<User> getUser(
       @RequestParam(required=false) String username) {
            return userService.getUsersFromUsername(username);    
        }
    @PostMapping("/addUser")
    public ResponseEntity<User> addNewUser(@RequestBody User user) {
        User createdUser = userService.addUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PutMapping("/editUser")
    public ResponseEntity<User> updateExistingUser(@RequestBody User user) {
        User resultUser = userService.updateUser(user);
        if(resultUser != null) {
            return new ResponseEntity<>(resultUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{userUsername}")
    public ResponseEntity<String> deleteExistingUser(@PathVariable String userUsername) {
        userService.deleteUser(userUsername);
        return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
    }

}