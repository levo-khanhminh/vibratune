package com.example.VibratuneMusicPlayerApp.repository;

import com.example.VibratuneMusicPlayerApp.model.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token,Long> {
    @Query(value ="select t from Token t inner join User u on t.user.id=u.id where  u.id=:id  and (t.isRevoked=false and  t.isExpired=false)")
    List<Token> findAllValidTokensByUser(Long id);
    Optional<Token> findByToken(String token);
}
