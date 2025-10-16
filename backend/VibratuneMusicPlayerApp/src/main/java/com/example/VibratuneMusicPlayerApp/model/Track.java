package com.example.VibratuneMusicPlayerApp.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

@Entity
@Table(name ="tracks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Track implements Serializable {
    @Id
    @GeneratedValue(strategy  = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = false, nullable = false)
    private String title;
    private String shortTitle;
    private String description;
    private String coverImageUrl;
    private String lyrics;
    private int duration;
    private int trackRank;
    @Column(columnDefinition = "LONGTEXT")
    private String trackUrl;
    @Column(columnDefinition = "LONGTEXT")
    private String trackPreviewUrl;
    ///  Old Id for sample data
    private Long oldId;
    @ManyToMany(mappedBy ="favouriteTracks")
    @JsonBackReference
    private List<User> likedUsers;
    @ManyToOne
    @JoinColumn(name  ="artist_id")
    @JsonBackReference
    private Artist  artist;
    @ManyToOne
    @JoinColumn(name  ="album_id")
    private Album album;
    @ManyToMany(mappedBy = "playlistTracks")
    @JsonBackReference
    private List<Playlist> playlists;

}
