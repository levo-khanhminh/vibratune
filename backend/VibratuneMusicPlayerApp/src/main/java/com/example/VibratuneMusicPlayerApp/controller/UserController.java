package com.example.VibratuneMusicPlayerApp.controller;

import com.example.VibratuneMusicPlayerApp.DTO.*;
import com.example.VibratuneMusicPlayerApp.DTO.DTOMapper.DTOMapper;
import com.example.VibratuneMusicPlayerApp.model.User;
import com.example.VibratuneMusicPlayerApp.service.AuthenticationService;
import com.example.VibratuneMusicPlayerApp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final AuthenticationService authenticationService;
    @GetMapping("/")
    public ResponseEntity<List<User>> getAllUsers(){
        return  ResponseEntity.ok(userService.getAllUsers());
    }
    @GetMapping("/me")
    public ResponseEntity<?> authenticatedUser() {
        try {
            User user =  this.authenticationService.getAuthenticatedUser();
            return ResponseEntity.ok(DTOMapper.mapToUserInfoDTO(user));
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(){
        try {
            User user =  this.authenticationService.getAuthenticatedUser();
            UserProfileDTO userProfileDTO =  this.userService.getUserProfile(user.getId());
            return ResponseEntity.ok(userProfileDTO);
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
    @PutMapping("/profile")
    public ResponseEntity<?> updateUserProfile(@RequestBody UserProfileDTO userProfileDTO){
        try {
            UserProfileDTO newProfile =  this.userService.editUserProfile(userProfileDTO);
            return ResponseEntity.ok(newProfile);
        }catch(Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @GetMapping("/{userId}/playlists")
    public ResponseEntity<?> getCreatedPlaylits(@PathVariable(name="userId") Long userId) {
        try {
            User user = this.userService.getUserById(userId);
            UserPlaylistDTO userPlaylistDTO = UserPlaylistDTO.builder()
                    .userId(user.getId())
                    .createdPlaylists(user.getCreatedPlaylists().stream().map(DTOMapper::mapToPlaylistDTO).toList())
                    .build();
            return ResponseEntity.ok(userPlaylistDTO);
        } catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }
    @PostMapping("/{userId}/playlists/{playlistId}/tracks/{trackId}")
    public ResponseEntity<?> addTrackToPlaylist(@PathVariable(name="userId") Long userId, @PathVariable(name="playlistId")  Long playlistId, @PathVariable(name="trackId") Long trackId){
        try {
            PlaylistDTO dto =  this.userService.addTrackToPlaylist(userId, trackId,playlistId);
            return ResponseEntity.ok(dto);
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }

    }
    @DeleteMapping("/{userId}/playlists/{playlistId}/tracks/{trackId}")
    public ResponseEntity<?> removeTrackFromPlaylist(@PathVariable(name="userId") Long userId, @PathVariable(name="playlistId")  Long playlistId, @PathVariable(name="trackId") Long trackId){
        try {
            PlaylistDTO dto =  this.userService.removeTrackFromPlaylist(userId, trackId,playlistId);
            return ResponseEntity.ok(dto);
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }

    }

    @PostMapping("/playlists")
    public ResponseEntity<?> createPlaylist(@RequestBody  CreatePlaylistDTO createPlaylistDTO){
        try {
            PlaylistDTO dto = this.userService.createPlaylist(createPlaylistDTO);
            return ResponseEntity.ok(dto);
        }catch (Exception ex){
        return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
   @GetMapping("/{userId}/favourite/tracks")
    public ResponseEntity<?> getUserFavouriteTracks(@PathVariable(name="userId")  Long userId){
        try {
            UserFavouriteTrackDTO dto =  this.userService.getUserFavouriteTracks(userId);
            return ResponseEntity.ok(dto);
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
   }

    @PostMapping("/favourite/tracks")
    public ResponseEntity<?> addFavouriteTrack(@RequestBody AddFavouriteTrackDTO addFavouriteTrackDTO){
        try {
            UserFavouriteTrackDTO userFavouriteTrackDTO  =  this.userService.addFavouriteTrack(addFavouriteTrackDTO);
            return ResponseEntity.ok(userFavouriteTrackDTO);
        }catch(Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @DeleteMapping("/favourite/tracks")
    public ResponseEntity<?> removeFavouriteTrack(@RequestBody RemoveFavouriteTrackDTO removeFavouriteTrackDTO){
        try {
            UserFavouriteTrackDTO userFavouriteTrackDTO =  this.userService.removeFavouriteTrack(removeFavouriteTrackDTO);
            return ResponseEntity.ok(userFavouriteTrackDTO);
        }catch (Exception exception){
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }
    @GetMapping("/{userId}/saved/albums")
    public ResponseEntity<?> getUserSavedAlbums(@PathVariable(name="userId") Long userId){
        try {
            UserSavedAlbumDTO dto =  this.userService.getUserSavedAlbums(userId);
            return ResponseEntity.ok(dto);
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping("/{userId}/saved/albums/{albumId}")
    public ResponseEntity<?> saveAlbum(@PathVariable(name="userId") Long userId, @PathVariable(name="albumId") Long albumId){
        try {
          UserSavedAlbumDTO dto =   this.userService.saveAlbum(userId,albumId);
          return ResponseEntity.ok(dto);
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
    @DeleteMapping("/{userId}/saved/albums/{albumId}")
    public ResponseEntity<?> unsavedAlbum(@PathVariable(name="userId") Long userId, @PathVariable(name="albumId") Long albumId){
        try {
            UserSavedAlbumDTO dto =   this.userService.unsaveAlbum(userId,albumId);
            return ResponseEntity.ok(dto);
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @GetMapping("/{userId}/saved/playlists")
    public ResponseEntity<?> getUserSavedPlaylists(@PathVariable(name="userId") Long userId){
        try {
          UserSavedPlaylistDTO dto   =  this.userService.getUserSavedPlaylists(userId);
            return ResponseEntity.ok(dto);
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
    @PostMapping("/{userId}/saved/playlists/{playlistId}")
    public ResponseEntity<?> savePlaylist(@PathVariable(name="userId") Long userId, @PathVariable(name="playlistId") Long playlistId){
        try {
            UserSavedPlaylistDTO dto =   this.userService.savePlaylist(userId,playlistId);
            return ResponseEntity.ok(dto);
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @DeleteMapping("/{userId}/saved/playlists/{playlistId}")
    public ResponseEntity<?> unsavePlaylist(@PathVariable(name="userId") Long userId, @PathVariable(name="playlistId") Long playlistId){
        try {
            UserSavedPlaylistDTO dto =   this.userService.unsavePlaylist(userId,playlistId);
            return ResponseEntity.ok(dto);
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }


}
