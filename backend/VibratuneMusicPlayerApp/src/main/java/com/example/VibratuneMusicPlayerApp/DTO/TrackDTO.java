package com.example.VibratuneMusicPlayerApp.DTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TrackDTO {
    private Long id;
    private String title;
    private String shortTitle;
    private String description;
    private String coverImageUrl;
    private String trackUrl;
    private String lyrics;
    private int duration;
    private int trackRank;
    private String trackPreviewUrl;
}
