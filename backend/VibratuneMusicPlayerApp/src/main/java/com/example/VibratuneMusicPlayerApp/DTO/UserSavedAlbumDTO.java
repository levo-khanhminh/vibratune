package com.example.VibratuneMusicPlayerApp.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserSavedAlbumDTO {
    private Long userId;
    private List<AlbumDTO> savedAlbums;
}
