package com.example.VibratuneMusicPlayerApp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Entity
@Table(name ="tracks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Track {
    @Id
    @GeneratedValue(strategy  = GenerationType.AUTO)
    private Long id;
    @Column(unique = true, nullable = false)
    private String name;
    private String description;
    private String coverImageUrl;
    private String lyrics;
    private int duration;
    @ManyToMany
    @JoinTable(name="track_genres" , joinColumns = @JoinColumn(name ="genre_id" , referencedColumnName = "id"), inverseJoinColumns =@JoinColumn(name ="track_id", referencedColumnName = "id") )
    private Set<Genre> trackGenres;

    @ManyToMany(mappedBy ="favouriteTracks")
    private List<User> users;
    @ManyToOne
    @JoinColumn(name  ="artist_id")
    private Artist  artist;

}
