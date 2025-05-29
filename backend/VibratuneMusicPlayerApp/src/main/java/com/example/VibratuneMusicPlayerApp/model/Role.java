package com.example.VibratuneMusicPlayerApp.model;

import com.example.VibratuneMusicPlayerApp.Enum.RoleName;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="roles")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Role {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    @Enumerated(EnumType.STRING)
    private RoleName authorities;
    @ManyToOne
    @JoinColumn(name ="user_id")
    @JsonBackReference
    private User user;
    public Role(RoleName  roleName){
        this.authorities =  roleName;
    }

}
