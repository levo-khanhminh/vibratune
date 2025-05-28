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
@PrimaryKeyJoinColumn(name = "user_id")
public class Artist  extends  User{
    @Id
    @GeneratedValue(strategy =GenerationType.AUTO)
    private Long id;
    private String name;
    private String  biography;
    private String avatarUrl;
    @Column(name="monthly_listeners")
    private int monthlyListeners;
    @OneToMany(mappedBy = "artist")
    private Set<Track> tracks;
    @OneToMany(mappedBy = "artist")
    private List<Album> albums;
}
