package com.example.VibratuneMusicPlayerApp.model;

import com.example.VibratuneMusicPlayerApp.Enum.Gender;
import com.example.VibratuneMusicPlayerApp.Enum.RoleName;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    @Column(name ="full_name")
    private String fullName;
    ///  Old Id for sample data
    private Long oldId;
    // Relationship Setting
    @ManyToMany(cascade =  CascadeType.ALL, fetch =  FetchType.EAGER)
    @JoinTable(name ="user_roles" , joinColumns = @JoinColumn(name ="user_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name ="role_id", referencedColumnName = "id"))
    @JsonManagedReference
    private List<Role>  roles;
    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<Token>  tokens;
    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    private List<Playlist> createdPlaylists;
    @ManyToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinTable(name = "user_saved_playlist" , joinColumns = @JoinColumn(name = "user_id" , referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "playlist_id", referencedColumnName = "id"))
    @JsonManagedReference
    private Set<Playlist> savedPlaylists;
    @ManyToMany(cascade  = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinTable(name="user_favourite_tracks", joinColumns = @JoinColumn(name="user_id", referencedColumnName = "id"),inverseJoinColumns = @JoinColumn(name ="track_id" , referencedColumnName = "id"))
    @JsonManagedReference
    private Set<Track> favouriteTracks;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream().map(role ->  new SimpleGrantedAuthority(role.getRoleName().name())).toList();
    }
    @ManyToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinTable(name ="user_saved_album", joinColumns = @JoinColumn(name ="user_id" , referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name ="album_id" , referencedColumnName = "id"))
    @JsonManagedReference
    private List<Album>  savedAlbums;
    public User(String email, String username, String password) {
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
