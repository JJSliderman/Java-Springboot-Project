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
import org.springframework.http.MediaType;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping(path="api/v1/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/greet")
    public ResponseEntity<String> greet(@RequestParam(defaultValue = "World") String name) {
        try {
            return new ResponseEntity<>("Hello, " + name + "!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Cannot return greeting!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/retrieve")
    public ResponseEntity<List<User>> getUser(
       @RequestParam(required=true) String username, @RequestParam(required=true) String password) {
            try {
                return new ResponseEntity<>(userService.getUsersFromUsernameAndPassword(username, password), HttpStatus.OK);    
            } catch (Exception e) {
                List<User> lister = new ArrayList<User>();
                return new ResponseEntity<>(lister, HttpStatus.OK);
            }
        }
    @PostMapping("/addUser")
    public ResponseEntity<String> addNewUser(@RequestBody User user) {
        try {
            String result = userService.addUser(user);
            if(result.equals("User created!")){
                return new ResponseEntity<>("User created successfully", HttpStatus.CREATED);
            } else if (result.equals("User edited!")) {
                return new ResponseEntity<>("User edited successfully", HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>("User not created/edited", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("User not created/edited", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/editUser")
    public ResponseEntity<String> updateExistingUser(@RequestBody User user) {
        User resultUser = userService.updateUser(user);
        if(resultUser != null) {
            return new ResponseEntity<>("User updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not updated", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{userUsername}")
    public ResponseEntity<String> deleteExistingUser(@PathVariable String userUsername) {
        try {
            String deletion = userService.deleteUser(userUsername);
            if(deletion.equals("User deleted!")){
                return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("User could not be deleted", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("User could not be deleted", HttpStatus.NOT_FOUND);
        }
    }

}