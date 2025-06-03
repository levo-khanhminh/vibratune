package com.example.VibratuneMusicPlayerApp.repository;

import com.example.VibratuneMusicPlayerApp.model.Track;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrackRepository extends CrudRepository<Track, Long> {
//       @Query("Select t from Track t where t.name=:name")
//        List<Track>  findTracksByName(String name);
//       @Query("Select t from Track t inner join Album a on  t.id=a.track.id where a.name=:albumName")
//        List<Track>  findTracksByAlbum(String albumName);
//       @Query("Select t from Track t inner join Artist a on t.id = a.track.id where a.name=:artistName")
//        List<Track> findTracksByArtist(String artistName);

}
