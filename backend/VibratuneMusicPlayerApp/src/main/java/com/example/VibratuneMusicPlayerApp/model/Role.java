package com.example.VibratuneMusicPlayerApp.model;

import com.example.VibratuneMusicPlayerApp.Enum.RoleName;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name="roles")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Role {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private RoleName roleName;
    @ManyToMany(mappedBy ="roles",fetch =  FetchType.EAGER)
    @JsonBackReference
    private List<User> users;
    public Role(RoleName  roleName){
        this.roleName =  roleName;
    }

}
