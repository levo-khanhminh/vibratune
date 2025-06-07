package com.example.VibratuneMusicPlayerApp.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
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
    @Column(name="is_private")
    private boolean isPrivate;
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;
    @ManyToMany(mappedBy = "savedPlaylists")
    @JsonBackReference
    private List<User> savedUsers;
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    @JoinTable(name="track_playlist", joinColumns = @JoinColumn(name="track_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name="playlist_id", referencedColumnName = "id"))
    private List<Track>  playlistTracks;
}
