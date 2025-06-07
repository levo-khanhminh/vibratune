package com.example.VibratuneMusicPlayerApp.DTO;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class UserPlaylistDTO {
    private Long userId;
    private List<PlaylistDTO> createdPlaylists;
}
