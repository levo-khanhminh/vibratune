package com.example.VibratuneMusicPlayerApp.service;

import com.example.VibratuneMusicPlayerApp.DTO.*;
import com.example.VibratuneMusicPlayerApp.DTO.DTOMapper.DTOMapper;
import com.example.VibratuneMusicPlayerApp.model.Album;
import com.example.VibratuneMusicPlayerApp.model.Playlist;
import com.example.VibratuneMusicPlayerApp.model.Track;
import com.example.VibratuneMusicPlayerApp.model.User;
import com.example.VibratuneMusicPlayerApp.repository.AlbumRepository;
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

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PlaylistService playlistService;
    private final TrackRepository trackRepository;
    private final PlaylistRepository playlistRepository;
    private final AlbumRepository albumRepository;
    public List<User>  getAllUsers(){
        return this.userRepository.findAll();
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
    public User getUserById(Long id){
        User user =  this.userRepository.findById(id).orElseThrow(()-> new RuntimeException("User not found"));
        return user;
    }

    public UserProfileDTO getUserProfile(Long id){
        User user = this.userRepository.findById(id).orElseThrow();
       return  UserProfileDTO.builder().id(id)
                .fullName(user.getFullName()).dateOfBirth(user.getDateOfBirth()).gender(user.getGender()).phoneNumber(user.getPhone()).build();
    }

    /// TODO  :  Try to handle edit profile with avatar file  and upload them to  the AWS S3 Busket
    public UserProfileDTO editUserProfile(UserProfileDTO userProfileDTO){
        User oldUser =  this.userRepository.findById(userProfileDTO.getId()).orElseThrow();
        oldUser.setFullName(userProfileDTO.getFullName());
        oldUser.setDateOfBirth(userProfileDTO.getDateOfBirth());
        oldUser.setPhone(userProfileDTO.getPhoneNumber());
        oldUser.setGender(userProfileDTO.getGender());
        User user =  this.userRepository.save(oldUser);
        return  UserProfileDTO.builder().id(user.getId())
                .fullName(user.getFullName()).
                 dateOfBirth(user.getDateOfBirth())
                .gender(user.getGender())
                .phoneNumber(user.getPhone())
                .build();
    }
    /// Core  Functionalities Implementations :
    /// 1. Create Playlist
    public PlaylistDTO createPlaylist(CreatePlaylistDTO createPlaylistDTO){
        User user =  this.userRepository.findById(createPlaylistDTO.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        boolean isExistingName =  user.getCreatedPlaylists().stream().anyMatch(p -> p.getName().equals(createPlaylistDTO.getName()));
        if(isExistingName){
            throw new RuntimeException("Playlist name already existed");
        }
        Playlist playlist = new Playlist();
        playlist.setName(createPlaylistDTO.getName());
        playlist.setUser(user);
        playlist.setPrivate(createPlaylistDTO.isPrivate());
        user.getCreatedPlaylists().add(playlist);
        this.userRepository.save(user);
        this.playlistRepository.save(playlist);
        return DTOMapper.mapToPlaylistDTO(playlist);
    }
    public UserFavouriteTrackDTO getUserFavouriteTracks(Long userId){
        User user =  this.userRepository.findById(userId).orElseThrow(() ->  new RuntimeException("User not found"));
        return UserFavouriteTrackDTO.builder()
                .favouriteTracks(user.getFavouriteTracks().stream().map(DTOMapper::mapToTrackDTO).toList())
                .userId(user.getId())
                .build();
    }
    /// 2. Add Favourite Track
    public UserFavouriteTrackDTO addFavouriteTrack(AddFavouriteTrackDTO addFavouriteTrackDTO){
        User user =  this.userRepository.findById(addFavouriteTrackDTO.getUserId()).orElseThrow(()-> new RuntimeException("User not found"));
        Track track =trackRepository.findById(addFavouriteTrackDTO.getTrackId()).orElseThrow(() -> new RuntimeException("Track not found"));
        boolean isExisting  =  user.getFavouriteTracks().stream().anyMatch(t -> t.getId().equals(track.getId()));
        if(isExisting){
           throw new RuntimeException("Track existed in the Favourite");
        }
        user.getFavouriteTracks().add(track);
        track.getLikedUsers().add(user);
        this.trackRepository.save(track);
        this.userRepository.save(user);
        return  UserFavouriteTrackDTO.builder()
                .favouriteTracks(user.getFavouriteTracks().stream().map(DTOMapper::mapToTrackDTO).toList())
                .userId(user.getId())
                .build();
    }
    /// 3. Remove Favourite Track
    public UserFavouriteTrackDTO removeFavouriteTrack(RemoveFavouriteTrackDTO removeFavouriteTrackDTO){
        User user =  this.userRepository.findById(removeFavouriteTrackDTO.getUserId()).orElseThrow(() ->  new RuntimeException("User not found"));
        Track track  =  this.trackRepository.findById(removeFavouriteTrackDTO.getTrackId()).orElseThrow(()-> new RuntimeException("Track not found "));


        if(!user.getFavouriteTracks().contains(track)){
            throw  new RuntimeException("Track does not exist");
        }
        user.getFavouriteTracks().remove(track);
        track.getLikedUsers().remove(user);
        this.userRepository.save(user);
        this.trackRepository.save(track);
        return  UserFavouriteTrackDTO.builder()
                .favouriteTracks(user.getFavouriteTracks().stream().map(DTOMapper::mapToTrackDTO).toList())
                .userId(user.getId())
                .build();
    }
    /// 4. Add Track to  Playlist
    public PlaylistDTO addTrackToPlaylist(Long userId, Long trackId, Long playlistId) throws AccessDeniedException {
        User user =  this.userRepository.findById(userId).orElseThrow(() ->  new RuntimeException("User not found"));
        Playlist playlist=  this.playlistService.addTrackToPlaylist(trackId,playlistId);
        if (!playlist.getUser().getId().equals(userId)) {
            throw new AccessDeniedException("User does not own the playlist");
        }
       return DTOMapper.mapToPlaylistDTO(playlist);
    }
    /// 5.  Remove Track from Playlist
    public PlaylistDTO removeTrackFromPlaylist(Long userId,Long trackId, Long playlistId){
        User user = this.userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Playlist userCreatedPlaylsit =  user.getCreatedPlaylists().stream().filter(p -> p.getId().equals(playlistId)).findFirst().orElseThrow(() -> new RuntimeException("User not created the playlist"));
        Playlist playList =  this.playlistService.removeTrackfromPlaylist(trackId,userCreatedPlaylsit.getId());
        return DTOMapper.mapToPlaylistDTO(playList);
    }
  /// 6. Save Playlist
    public UserSavedPlaylistDTO savePlaylist(Long userId, Long playlistId) {
        User user = this.userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Playlist playlist = this.playlistService.getPlaylistById(playlistId);
        if (playlist == null) {
            throw new RuntimeException("Playlist not found");
        }
        if (playlist.isPrivate()) {
            throw new RuntimeException("Saved Denied - Playlist is private");
        }
        if(user.getSavedPlaylists().contains(playlist)){
            throw new RuntimeException("Playlist has been saved");
        }
        user.getSavedPlaylists().add(playlist);
        playlist.getSavedUsers().add(user);
        this.userRepository.save(user);
        this.playlistService.saveUserSavedPlaylist(playlist,user);
        return DTOMapper.mapToUserSavedPlaylistDTO(user);
    }
     /// 7.  Unsave Playlist
    public UserSavedPlaylistDTO unsavePlaylist(Long userId, Long playlistId){
        User user =  this.userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Playlist playlist  =  this.playlistRepository.findById(playlistId).orElseThrow(() -> new RuntimeException("Playlist not found"));
//        Playlist targetedPlaylist =  user.getSavedPlaylists().
        if(!user.getSavedPlaylists().contains(playlist)){
            throw  new RuntimeException("Playlist not saved ");
        }
        user.getSavedPlaylists().remove(playlist);
        playlist.getSavedUsers().remove(user);
        this.userRepository.save(user);
        this.playlistRepository.save(playlist);
        return DTOMapper.mapToUserSavedPlaylistDTO(user);
    }
    public UserSavedAlbumDTO  saveAlbum(Long userId, Long albumId){
        User user =  this.userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Album album  = this.albumRepository.findById(albumId).orElseThrow(()->  new RuntimeException("Album not found"));
        boolean isExisting  =  user.getSavedAlbums().stream().anyMatch(a -> a.getId().equals(album.getId()));
        if(!isExisting){
            user.getSavedAlbums().add(album);
            album.getSavedUsers().add(user);
            this.userRepository.save(user);
            this.albumRepository.save(album);
        }else{
            throw  new RuntimeException("Album has been saved");
        }
        return DTOMapper.mapToUserSavedAlbumDTO(user);
    }
    public UserSavedAlbumDTO unsaveAlbum(Long userId, Long albumId){
        User user =  this.userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Album album  = this.albumRepository.findById(albumId).orElseThrow(()->  new RuntimeException("Album not found"));
        user.getSavedAlbums().remove(album);
        album.getSavedUsers().remove(user);
        this.userRepository.save(user);
        this.albumRepository.save(album);
        return DTOMapper.mapToUserSavedAlbumDTO(user);
    }
    public UserSavedAlbumDTO getUserSavedAlbums(Long userId){
        User user =  this.userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        return DTOMapper.mapToUserSavedAlbumDTO(user);
    }
    public UserSavedPlaylistDTO getUserSavedPlaylists(Long userId){
        User user =  this.userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return DTOMapper.mapToUserSavedPlaylistDTO(user);
    }


}
