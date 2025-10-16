package com.example.VibratuneMusicPlayerApp.DTO;

import com.example.VibratuneMusicPlayerApp.Enum.Gender;
import com.example.VibratuneMusicPlayerApp.model.Album;
import com.example.VibratuneMusicPlayerApp.model.Role;
import com.example.VibratuneMusicPlayerApp.model.Track;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoDTO {
    private Long id;
    private String fullName;
    private LocalDate dateOfBirth;
    private Gender gender;
    private String phoneNumber;
    private List<Role> roles;
    private String avatarUrl;
    private List<TrackDTO> favouriteTracks;
    private Set<AlbumDTO> savedAlbums;
    private List<PlaylistDTO> createdPlaylists;
    private Set<PlaylistDTO> savedPlaylists;
}
