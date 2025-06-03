package com.example.VibratuneMusicPlayerApp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name="playlists")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Playlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable=false)
    private String name;
    private String coverImageUrl;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToMany(mappedBy = "savedPlaylists")
    private List<User> savedUsers;
}
