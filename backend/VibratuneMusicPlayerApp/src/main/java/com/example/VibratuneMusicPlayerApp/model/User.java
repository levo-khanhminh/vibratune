package com.example.VibratuneMusicPlayerApp.model;

import com.example.VibratuneMusicPlayerApp.Enum.Gender;
import com.example.VibratuneMusicPlayerApp.Enum.RoleName;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Entity
@Table(name ="users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(unique = true, nullable=false)
    private String username;
    @Column(unique =  true, nullable = false)
    private String email;
    @Column(nullable=false)
    private String password;
    private boolean isVerified;
    @Column(name ="verification_code")
    private String verificationCode;
    @Column(name ="verification_expiration")
    private LocalDateTime  verificationCodeExpiresAt;
    @Column(nullable = true)
    private String phone;
    @Column(nullable = true)
    private String address;
    @Column(nullable = true)
    private LocalDate dateOfBirth;
    @Column(nullable = true)
    @Enumerated(EnumType.STRING)
    private Gender gender;
    @Column(nullable = true)
    private String avatarUrl;



    // Relationship Setting
    @OneToMany(mappedBy = "user")
    private List<Role>  roles = new ArrayList<>(List.of(new Role(RoleName.LISTENER)));
    @OneToMany(mappedBy = "user")
    private List<Playlist> createdPlaylists;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "user_saved_playlist" , joinColumns = @JoinColumn(name = "playlist_id" , referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
    private Set<Playlist> savedPlaylists;

    @ManyToMany(cascade  = CascadeType.ALL)
    @JoinTable(name="user_favourite_tracks", joinColumns = @JoinColumn(name="track_id", referencedColumnName = "id"),inverseJoinColumns = @JoinColumn(name ="user_id" , referencedColumnName = "id"))
    private Set<Track> favouriteTracks;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream().map(role ->  new SimpleGrantedAuthority(role.getAuthorities().name())).toList();
    }
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name ="user_saved_album", joinColumns = @JoinColumn(name ="album_id" , referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name ="user_id" , referencedColumnName = "id"))
    private List<Album>  savedAlbums;
    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
    @Override
    public String getPassword() {
        return  this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}
