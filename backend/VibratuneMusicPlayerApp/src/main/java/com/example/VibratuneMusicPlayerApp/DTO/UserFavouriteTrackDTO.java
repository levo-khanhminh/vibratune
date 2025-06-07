package com.example.VibratuneMusicPlayerApp.DTO;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class UserFavouriteTrackDTO {
    private Long userId;
    private List<TrackDTO> favouriteTracks;
}
