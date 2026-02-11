package com.intro.hazrati_portfolio.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    void deleteByUsername(String usernameToDelete);

    Optional<User> findByUsername(String usernameToFind);
}