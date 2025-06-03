package com.example.VibratuneMusicPlayerApp.DTO;

import com.example.VibratuneMusicPlayerApp.model.Artist;
import com.example.VibratuneMusicPlayerApp.model.Track;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
public class AlbumDTO {
    private Long id;
    private String name;
    private String description;
    private LocalDate releaseDate;
    private String bigCoverImageUrl;
    private String smallCoverImageUrl;
    private String mediumCoverImageUrl;
    private ArtistDTO artist;
    private GenreDTO genre;
    private List<TrackDTO>  tracks;
}
