package com.example.VibratuneMusicPlayerApp.repository;

import com.example.VibratuneMusicPlayerApp.model.Playlist;
import com.example.VibratuneMusicPlayerApp.model.Track;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaylistRepository extends CrudRepository<Playlist,Long> {

    List<Playlist>  findByName(String name);
}
