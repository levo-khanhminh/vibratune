package com.example.VibratuneMusicPlayerApp.DTO.DTOMapper;

import com.example.VibratuneMusicPlayerApp.DTO.*;
import com.example.VibratuneMusicPlayerApp.model.*;

import java.util.Collections;
import java.util.Optional;
import java.util.stream.Collectors;

public class DTOMapper {
    public static ArtistDTO mapToArtistDTO(Artist artist) {
        return ArtistDTO.builder()
                .id(artist.getId())
                .name(artist.getName())
                .bigPictureUrl(artist.getBigPictureUrl())
                .mediumPictureUrl(artist.getMediumPictureUrl())
                .smallPictureUrl(artist.getSmallPictureUrl())
                .monthlyListeners(artist.getMonthlyListeners())
                .numberOfFans(artist.getNumberOfFans())
                .biography(artist.getBiography())
                .build();
    }
    public static DetailArtistDTO mapToDetailArtistDTO(Artist artist) {
        return DetailArtistDTO.builder()
                .id(artist.getId())
                .name(artist.getName())
                .bigPictureUrl(artist.getBigPictureUrl())
                .mediumPictureUrl(artist.getMediumPictureUrl())
                .smallPictureUrl(artist.getSmallPictureUrl())
                .monthlyListeners(artist.getMonthlyListeners())
                .numberOfFans(artist.getNumberOfFans())
                .biography(artist.getBiography())
                .tracks(artist.getTracks().stream().map(DTOMapper::mapToTrackDTO).toList())
                .albums(artist.getAlbums().stream().map(DTOMapper::mapToAlbumDTO).toList())
                .build();
    }

    public static TrackDTO mapToTrackDTO(Track track) {
        return TrackDTO.builder()
                .id(track.getId())
                .title(track.getTitle())
                .shortTitle(track.getShortTitle())
                .description(track.getDescription())
                .coverImageUrl(track.getCoverImageUrl())
                .lyrics(track.getLyrics())
                .trackUrl(track.getTrackUrl())
                .duration(track.getDuration())
                .trackRank(track.getTrackRank())
                .trackPreviewUrl(track.getTrackPreviewUrl())
                .artist(mapToArtistDTO(track.getArtist()))
                .build();
    }

    public static GenreDTO mapToGenreDTO(Genre genre) {
        return GenreDTO.builder()
                .id(genre.getId())
                .name(genre.getName())
                .bigPicture(genre.getBigPicture())
                .mediumPicture(genre.getMediumPicture())
                .smallPicture(genre.getSmallPicture())
                .build();
    }
    public static AlbumDTO mapToAlbumDTO(Album album){
            return  AlbumDTO.builder()
                    .id(album.getId())
                    .bigCoverImageUrl(album.getBigCoverImageUrl())
                    .mediumCoverImageUrl(album.getMediumCoverImageUrl())
                    .smallCoverImageUrl(album.getSmallCoverImageUrl())
                    .artist(mapToArtistDTO(album.getArtist()))
                    .genre(mapToGenreDTO(album.getGenre()))
                    .tracks(album.getAlbumTracks().stream().map(DTOMapper::mapToTrackDTO).toList())
                    .releaseDate(album.getReleaseDate())
                    .name(album.getName())
                    .build();
    }
    public static TopAlbumDTO mapToTopAlbumDTO(Album album){
        return TopAlbumDTO.builder()
                .id(album.getId())
                .name(album.getName())
                .bigCoverImageUrl(album.getBigCoverImageUrl())
                .mediumCoverImageUrl(album.getMediumCoverImageUrl())
                .smallCoverImageUrl(album.getSmallCoverImageUrl())
                .build();
    }
    public static PlaylistDTO mapToPlaylistDTO(Playlist playlist){
        return PlaylistDTO.builder()
                .id(playlist.getId())
                .name(playlist.getName())
                .isPrivate(playlist.isPrivate())
                .coverImageUrl(playlist.getCoverImageUrl())
                .tracks(Optional.ofNullable(playlist.getPlaylistTracks()).orElse(Collections.emptyList())
                        .stream().map(DTOMapper::mapToTrackDTO).toList())
                .build();
    }
    public static UserSavedPlaylistDTO mapToUserSavedPlaylistDTO(User user){
        return UserSavedPlaylistDTO.builder()
                .userId(user.getId())
                .playlists(user.getSavedPlaylists().stream().map(DTOMapper::mapToPlaylistDTO).toList())
                .build();
    }
    public static  UserSavedAlbumDTO mapToUserSavedAlbumDTO(User user){
        return UserSavedAlbumDTO.builder()
                .userId(user.getId())
                .savedAlbums(user.getSavedAlbums().stream().map(DTOMapper::mapToAlbumDTO).toList())
                .build();
    }
    public static UserInfoDTO mapToUserInfoDTO(User user){
        return UserInfoDTO.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .gender(user.getGender())
                .dateOfBirth(user.getDateOfBirth())
                .phoneNumber(user.getPhone())
                .roles(user.getRoles())
                .createdPlaylists(user.getCreatedPlaylists().stream().map(DTOMapper::mapToPlaylistDTO).toList())
                .favouriteTracks(user.getFavouriteTracks().stream().map(DTOMapper::mapToTrackDTO).toList())
                .savedPlaylists(user.getSavedPlaylists().stream().map(DTOMapper::mapToPlaylistDTO).collect(Collectors.toSet()))
                .savedAlbums(user.getSavedAlbums().stream().map(DTOMapper::mapToAlbumDTO).collect(Collectors.toSet()))
                .build();
    }


}
