package com.example.VibratuneMusicPlayerApp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;
@Entity
@Table(name  ="artists")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Artist  {
    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String  biography;
    private String bigPictureUrl;
    private String mediumPictureUrl;
    private String smallPictureUrl;
    private long numberOfFans;
    @Column(name="monthly_listeners")
    private int monthlyListeners;
    ///  Old Id for sample data
    private Long oldId;
    @OneToOne
    @JoinColumn(name ="user_id")
    private User user;
    @OneToMany(mappedBy = "artist")
    private Set<Track> tracks;
    @OneToMany(mappedBy = "artist")
    private List<Album> albums;

}
