package com.example.VibratuneMusicPlayerApp.service;

import com.example.VibratuneMusicPlayerApp.DTO.CreatePlaylistDTO;
import com.example.VibratuneMusicPlayerApp.model.Playlist;
import com.example.VibratuneMusicPlayerApp.model.Track;
import com.example.VibratuneMusicPlayerApp.model.User;
import com.example.VibratuneMusicPlayerApp.repository.PlaylistRepository;
import com.example.VibratuneMusicPlayerApp.repository.TrackRepository;
import com.example.VibratuneMusicPlayerApp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.parameters.P;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final TrackRepository trackRepository;
    private final PlaylistRepository playlistRepository;
    public List<User>  getAllUsers(){
        return (List<User>) this.userRepository.findAll();
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user=  this.userRepository.findByEmail(username).orElse(null);
        if(user == null){
            throw new UsernameNotFoundException("User not found");
        }else{
            return user;
        }
    }
//    public Playlist createPlaylist(Long userId,CreatePlaylistDTO createPlaylistDTO){
//        User user =  this.userRepository.findById(userId).orElseThrow();
//        String playlistName =  createPlaylistDTO.getName();
//        List<Playlist> foundPLaylistWithGivenName = this.playlistRepository.findByName(playlistName);
//        if(!foundPLaylistWithGivenName.isEmpty()) {
//            throw new RuntimeException("Playlist name already exists");
//        }
//        Playlist playlist  = new Playlist();
//        playlist.setName(playlistName);
//        playlist.setUser(user);
//        user.getCreatedPlaylists().add(playlist);
//        userRepository.save(user);
//        playlistRepository.save(playlist);
//        return playlist;
//    }
//    public Set<Track> addUserFavouriteTrack(Long userId, Long trackId){
//        User user  =  this.userRepository.findById(userId).orElse(null);
//        if(user == null){
//            throw new RuntimeException("User not found");
//        }
//        Track track =  this.trackRepository.findById(trackId).orElseThrow();
//        user.getFavouriteTracks().add(track);
//        track.getLikedUsers().add(user);
//        this.userRepository.save(user);
//        this.trackRepository.save(track);
//        return user.getFavouriteTracks();
//    }
}
