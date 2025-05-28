package com.example.VibratuneMusicPlayerApp.model;

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
    @GeneratedValue(strategy =  GenerationType.AUTO)
    private Long id;
    @Column(name  ="album_name")
    private String name;
    @Column(name ="album_description")
    private String description;
    private LocalDate createdDate;
    private LocalDate publishedDate;
    private String coverImage;
    @ManyToOne
    @JoinTable(name  ="artist_id")
    private Artist artist;
    @ManyToMany(cascade =  CascadeType.ALL)
    @JoinTable(name ="album_tracks",
            joinColumns = @JoinColumn(name  ="track_id" , referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name ="album_id" ,referencedColumnName = "id")
    )
    private List<Track> albumTracks;

}
