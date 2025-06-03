package com.example.VibratuneMusicPlayerApp.repository;

import com.example.VibratuneMusicPlayerApp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User>  findByEmail(String email);
    Optional<User>  findByVerificationCode(String verificationCode);
}
