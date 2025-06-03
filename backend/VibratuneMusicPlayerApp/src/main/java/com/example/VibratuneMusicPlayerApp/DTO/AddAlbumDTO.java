package com.example.VibratuneMusicPlayerApp.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class AddAlbumDTO {
    private Long id;
    private  String title;
    private String bigCoverImageUrl;
    private String smallCoverImageUrl;
    private String  mediumCoverImageUrl;
    private Long artist_id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate releaseDate;
    private Long genre_id;
}
