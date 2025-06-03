package com.example.VibratuneMusicPlayerApp.repository;

import com.example.VibratuneMusicPlayerApp.model.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {
}
