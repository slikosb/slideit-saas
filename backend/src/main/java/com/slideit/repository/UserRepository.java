package com.slideit.repository;


import com.slideit.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // find user by with an email
    boolean existsByEmail(String email);
}