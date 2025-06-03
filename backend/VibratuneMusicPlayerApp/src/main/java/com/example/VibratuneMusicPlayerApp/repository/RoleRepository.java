package com.example.VibratuneMusicPlayerApp.repository;

import com.example.VibratuneMusicPlayerApp.Enum.RoleName;
import com.example.VibratuneMusicPlayerApp.model.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleRepository extends CrudRepository<Role,Long> {
     Role findByRoleName(RoleName roleName);
}
