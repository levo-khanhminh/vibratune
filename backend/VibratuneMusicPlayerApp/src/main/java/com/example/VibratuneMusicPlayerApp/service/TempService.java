package com.example.VibratuneMusicPlayerApp.service;

import com.example.VibratuneMusicPlayerApp.DTO.*;
import com.example.VibratuneMusicPlayerApp.model.*;
import com.example.VibratuneMusicPlayerApp.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TempService {
    private final UserRepository userRepository;
    private final GenreRepository genreRepository;
    private final ArtistRepository artistRepository;
    private final AlbumRepository albumRepository;
    private final TrackRepository trackRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    public User addUser(UserDTO userDTO) {
        User user = new User();
        user.setOldId(userDTO.getId());
        user.setEmail(userDTO.getEmail());
        user.setUsername(userDTO.getUsername());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setVerified(true);
        Role role  = roleRepository.findById(1l).orElseThrow();
        Role aristRole =  roleRepository.findById(4l).orElseThrow();
        user.setRoles(List.of(role,aristRole));
        userRepository.save(user);
        return user;
    }
    public Artist addArtist(AddArtistDTO addArtistDTO) {
        Long userId =  addArtistDTO.getUser_id();
        User baseUser  =  userRepository.findById(userId).orElseThrow();
        Artist artist =  new Artist();
        artist.setUser(baseUser);
        artist.setOldId(addArtistDTO.getId());
        artist.setName(addArtistDTO.getName());
        artist.setBigPictureUrl(addArtistDTO.getBigPictureUrl());
        artist.setMediumPictureUrl(addArtistDTO.getMediumPictureUrl());
        artist.setSmallPictureUrl(addArtistDTO.getSmallPictureUrl());
        artist.setNumberOfFans(addArtistDTO.getNumberOfFans());
        return artistRepository.save(artist);
    }
    public Genre addGenre(AddGenreDTO addGenreDTO) {
        Genre genre  = new Genre();
        genre.setOldId(addGenreDTO.getId());
        genre.setName(addGenreDTO.getName());
        return genreRepository.save(genre);
    }

    public Album addAlbum(AddAlbumDTO addAlbumDTO){
        Artist  artist =  artistRepository.findById(addAlbumDTO.getArtist_id()).orElseThrow();
        Genre genre  = genreRepository.findById(addAlbumDTO.getGenre_id()).orElseThrow();
        Album  album = new Album();
        album.setName(addAlbumDTO.getTitle());
        album.setArtist(artist);
        album.setBigCoverImageUrl(addAlbumDTO.getBigCoverImageUrl());
        album.setMediumCoverImageUrl(addAlbumDTO.getMediumCoverImageUrl());
        album.setSmallCoverImageUrl(addAlbumDTO.getSmallCoverImageUrl());
        album.setReleaseDate(addAlbumDTO.getReleaseDate());
        album.setGenre(genre);
        album.setOldId(addAlbumDTO.getId());
        return albumRepository.save(album);
    }
    public Track addTrack(AddTrackDTO addTrackDTO){
        Artist artist =  artistRepository.findById(addTrackDTO.getArtist_id()).orElseThrow();
        Album album = albumRepository.findById(addTrackDTO.getAlbum_id()).orElseThrow();
        Track track =  new Track();
        track.setArtist(artist);
        track.setAlbum(album);
        track.setTrackRank(addTrackDTO.getRank());
        track.setDuration(addTrackDTO.getDuration());
        track.setTitle(addTrackDTO.getTitle());
        track.setShortTitle(addTrackDTO.getShortTile());
        track.setTrackPreviewUrl(addTrackDTO.getPreview());
        track.setOldId(addTrackDTO.getId());
        return trackRepository.save(track);
    }
}
