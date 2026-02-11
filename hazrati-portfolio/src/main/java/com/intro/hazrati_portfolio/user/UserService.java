package com.intro.hazrati_portfolio.user;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.stream.Collectors;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Component
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public List<User> getUsersFromAge(Integer age) {
        return userRepository.findAll().stream().filter(user -> age.equals(user.getAge())).collect(Collectors.toList());
    }

    public List<User> getUsersFromName(String searchText) {
        return userRepository.findAll().stream().filter(user -> user.getName().toLowerCase().contains(searchText.toLowerCase())).collect(Collectors.toList());
    }

    public List<User> getUsersFromUsername(String searchText) {
        return userRepository.findAll().stream().filter(user -> user.getUsername().toLowerCase().contains(searchText.toLowerCase())).collect(Collectors.toList());
    }

    public User addUser(User user) {
        userRepository.save(user);
        return user;
    }

    public User updateUser(User updatedUser) {
        Optional<User> existingUser = userRepository.findByUsername(updatedUser.getUsername());
        if(existingUser.isPresent()){
            User userToUpdate = existingUser.get();
            userToUpdate.setAge(updatedUser.getAge());
            userToUpdate.setName(updatedUser.getName());
            userToUpdate.setUsername(updatedUser.getUsername());
            userToUpdate.setPassword(updatedUser.getPassword());

            userRepository.save(userToUpdate);
            return userToUpdate;
        }
        return null;
    }

    @Transactional
    public void deleteUser(String usernameToDelete) {
        userRepository.deleteByUsername(usernameToDelete);
    }
}