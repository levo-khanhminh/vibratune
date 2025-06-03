package com.example.VibratuneMusicPlayerApp.DTO.DTOMapper;

import com.example.VibratuneMusicPlayerApp.DTO.*;
import com.example.VibratuneMusicPlayerApp.model.Album;
import com.example.VibratuneMusicPlayerApp.model.Artist;
import com.example.VibratuneMusicPlayerApp.model.Genre;
import com.example.VibratuneMusicPlayerApp.model.Track;

public class DTOMapper {
    public static ArtistDTO mapToArtistDTO(Artist artist) {
        return ArtistDTO.builder()
                .name(artist.getName())
                .bigPictureUrl(artist.getBigPictureUrl())
                .mediumPictureUrl(artist.getMediumPictureUrl())
                .smallPictureUrl(artist.getSmallPictureUrl())
                .monthlyListeners(artist.getMonthlyListeners())
                .numberOfFans(artist.getNumberOfFans())
                .biography(artist.getBiography())
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
}
