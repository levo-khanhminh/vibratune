package com.example.VibratuneMusicPlayerApp.controller;

import com.example.VibratuneMusicPlayerApp.DTO.TrackDTO;
import com.example.VibratuneMusicPlayerApp.model.Track;
import com.example.VibratuneMusicPlayerApp.repository.TrackRepository;
import com.example.VibratuneMusicPlayerApp.service.TrackService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/tracks")
public class TrackController {
    private final TrackService trackService;
    public TrackController(TrackService trackService){
        this.trackService=trackService;
    }

    @GetMapping("/")
    public List<TrackDTO>  getAllTracks(){
        return this.trackService.getAllTracks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTrackById(@PathVariable Long id){
       try {
           TrackDTO trackDTO   =  this.trackService.getTrackById(id);
           return ResponseEntity.ok(trackDTO);
       }catch(Exception ex){
           return ResponseEntity.badRequest().body(ex.getMessage());
       }
    }
    @GetMapping("/top")
    public ResponseEntity<?>  getTopTracks(@RequestParam(name="count") int count){
        return ResponseEntity.ok(this.trackService.getTopTracks(count));
    }
    @GetMapping("/artist")
    public ResponseEntity<?>  getTracksByArtists(@RequestParam(name="name") String name){
        return ResponseEntity.ok(this.trackService.getAllTracksByArtist(name));
    }

    @GetMapping("/album")
    public ResponseEntity<?>  getTracksByAlbum(@RequestParam(name="name")  String name){
        return ResponseEntity.ok(this.trackService.getAllTracksByAlbum(name));
    }
    @GetMapping("/search")
    public ResponseEntity<?> getTracksByTitle(@RequestParam(name="title")  String title){
        return ResponseEntity.ok(this.trackService.getAllTracksByTitle(title));
    }

    @GetMapping("/genres/{genreId}")
    public ResponseEntity<List<TrackDTO>> getTracksByGenreId(@PathVariable(name="genreId")  Long genreId){
        return ResponseEntity.ok(this.trackService.getAllTracksByGenreId(genreId));
    }
    @GetMapping("/albums/{albumId}")
    public ResponseEntity<List<TrackDTO>> getTracksByAlbumId(@PathVariable(name="albumId")  Long albumId){
        return ResponseEntity.ok(this.trackService.getAllTracksByAlbumId(albumId));
    }

    @GetMapping("/artists/{artistId}")
    public ResponseEntity<List<TrackDTO>> getTracksByArtistId(@PathVariable(name="artistId")  Long artistId){
        return ResponseEntity.ok(this.trackService.getAllTracksByArtistId(artistId));
    }
}
