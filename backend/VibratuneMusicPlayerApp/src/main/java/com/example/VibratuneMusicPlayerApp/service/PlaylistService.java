package com.example.VibratuneMusicPlayerApp.service;

import com.example.VibratuneMusicPlayerApp.DTO.CreatePlaylistDTO;
import com.example.VibratuneMusicPlayerApp.model.Playlist;
import com.example.VibratuneMusicPlayerApp.model.Track;
import com.example.VibratuneMusicPlayerApp.model.User;
import com.example.VibratuneMusicPlayerApp.repository.PlaylistRepository;
import com.example.VibratuneMusicPlayerApp.repository.TrackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PlaylistService {
    private final PlaylistRepository playlistRepository;
    private final TrackRepository trackRepository;

    public Playlist getPlaylistById(Long id){
        return  this.playlistRepository.findById(id).orElse(null);
    }

    public void saveUserSavedPlaylist(Playlist playlist, User user){
        playlist.getSavedUsers().add(user);
        this.playlistRepository.save(playlist);
    }
    public Playlist addTrackToPlaylist(Long trackId, Long playlistId){
        Playlist playlist  =  this.playlistRepository.findById(playlistId).orElseThrow(() ->  new RuntimeException("Playlist not found"));
        Track track  =  this.trackRepository.findById(trackId).orElseThrow(() -> new RuntimeException("Track not found"));
        ///  WARNING :May add duplicate the existing track or playlist (Duplicate Track )
        ///  Temporary Solution
        boolean isExisting  =  playlist.getPlaylistTracks().stream().anyMatch(t -> t.getId().equals(track.getOldId()));
         if(!isExisting){
             playlist.getPlaylistTracks().add(track);
             track.getPlaylists().add(playlist);

             ///  Not using cascade =  CascadeType.Persist  -  To avoid confusions
            ///  By save both sides of the repositories
             this.trackRepository.save(track);
         }else{
             throw new RuntimeException("Playlist already existed");
         }
        return this.playlistRepository.save(playlist);
    }
    ///  Another solution is to change the List to Set which allows no duplicate objects.

    public Playlist removeTrackfromPlaylist(Long trackId, Long playlistId){
        Playlist playlist  =  this.playlistRepository.findById(playlistId).orElseThrow(() ->  new RuntimeException("Playlist not found"));
        Track track  =  this.trackRepository.findById(trackId).orElseThrow(() -> new RuntimeException("Track not found"));

       ///  WARNING :May remove the non-existing track or playlist
        boolean isExisting =  playlist.getPlaylistTracks().stream().anyMatch(t -> t.getId().equals(track));
        if(!isExisting){
            throw new RuntimeException("Track does not exist in playlist");
        }
        playlist.getPlaylistTracks().remove(track);
        track.getPlaylists().remove(playlist);
        trackRepository.save(track);
        return this.playlistRepository.save(playlist);
    }
}
