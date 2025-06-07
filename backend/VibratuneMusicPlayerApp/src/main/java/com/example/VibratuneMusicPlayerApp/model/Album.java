package com.example.VibratuneMusicPlayerApp.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name  ="albums")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Album {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;
    @Column(name  ="album_name")
    private String name;
    @Column(name ="album_description")
    private String description;
    private LocalDate releaseDate;
    private String bigCoverImageUrl;
    private String smallCoverImageUrl;
    private String mediumCoverImageUrl;
    ///  Old Id for sample data
    private Long oldId;
    @ManyToOne
    @JoinColumn(name  ="artist_id")
    private Artist artist;
    @OneToMany(mappedBy = "album")
    private List<Track> albumTracks;
    @ManyToOne
    @JoinColumn(name  ="genre_id")
    @JsonBackReference
    private Genre genre;
    @ManyToMany(mappedBy = "savedAlbums", fetch = FetchType.EAGER)
    @JsonBackReference
    private List<User> savedUsers;
}
