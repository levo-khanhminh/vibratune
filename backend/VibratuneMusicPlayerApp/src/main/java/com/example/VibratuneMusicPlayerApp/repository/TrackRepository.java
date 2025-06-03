package com.example.VibratuneMusicPlayerApp.repository;

import com.example.VibratuneMusicPlayerApp.model.Track;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrackRepository extends JpaRepository<Track, Long> {
        @Query("SELECT t FROM Track t WHERE LOWER(t.title) LIKE LOWER(CONCAT('%', :title, '%'))")
        List<Track>  searchTrackByTitle(@Param("title") String title);
        @Query("SELECT t FROM Track t WHERE LOWER(t.artist.name) LIKE LOWER(CONCAT('%', :artistName, '%'))")
        List<Track> searchTracksByArtistName(@Param("artistName") String artistName);
        @Query("SELECT t FROM Track t WHERE LOWER(t.album.name)  LIKE LOWER(CONCAT('%', :albumName, '%'))")
        List<Track>  searchTracksByAlbumName(@Param("albumName")  String albumName);
        @Query("SELECT t FROM Track t WHERE t.album.genre.id=:genreId")
        List<Track> getTracksByGenreId(@Param("genreId") Long genreId);
        @Query("SELECT t FROM Track t WHERE t.album.id=:albumId")
        List<Track> getTracksByAlbumId(@Param("albumId")  Long albumId);
        @Query("SELECT t from Track t WHERE t.artist.id=:artistId")
        List<Track> getTracksByArtistId(@Param("artistId") Long artistId);
}
