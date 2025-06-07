package com.example.VibratuneMusicPlayerApp.DTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RemoveFavouriteTrackDTO {
    private Long userId;
    private Long trackId;
}
