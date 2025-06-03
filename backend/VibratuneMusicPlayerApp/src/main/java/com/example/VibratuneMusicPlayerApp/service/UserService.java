package com.example.VibratuneMusicPlayerApp.service;

import com.example.VibratuneMusicPlayerApp.DTO.CreatePlaylistDTO;
import com.example.VibratuneMusicPlayerApp.DTO.UserProfileDTO;
import com.example.VibratuneMusicPlayerApp.model.Playlist;
import com.example.VibratuneMusicPlayerApp.model.Track;
import com.example.VibratuneMusicPlayerApp.model.User;
import com.example.VibratuneMusicPlayerApp.repository.PlaylistRepository;
import com.example.VibratuneMusicPlayerApp.repository.TrackRepository;
import com.example.VibratuneMusicPlayerApp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.parameters.P;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final TrackRepository trackRepository;
    private final PlaylistRepository playlistRepository;
    public List<User>  getAllUsers(){
        return (List<User>) this.userRepository.findAll();
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user=  this.userRepository.findByEmail(username).orElse(null);
        if(user == null){
            throw new UsernameNotFoundException("User not found");
        }else{
            return user;
        }
    }

    public UserProfileDTO getUserProfile(Long id){
        User user = this.userRepository.findById(id).orElseThrow();
        UserProfileDTO userProfileDTO =  UserProfileDTO.builder().id(id)
                .fullName(user.getFullName()).dateOfBirth(user.getDateOfBirth()).gender(user.getGender()).phoneNumber(user.getPhone()).build();
        return userProfileDTO;
    }

    /// TODO  :  Try to handle edit profile with avatar file  and upload them to  the AWS S3 Busket
    public UserProfileDTO editUserProfile(UserProfileDTO userProfileDTO){
        User oldUser =  this.userRepository.findById(userProfileDTO.getId()).orElseThrow();
        oldUser.setFullName(userProfileDTO.getFullName());
        oldUser.setDateOfBirth(userProfileDTO.getDateOfBirth());
        oldUser.setPhone(userProfileDTO.getPhoneNumber());
        oldUser.setGender(userProfileDTO.getGender());
        User user =  this.userRepository.save(oldUser);
        return  UserProfileDTO.builder().id(user.getId())
                .fullName(user.getFullName()).
                 dateOfBirth(user.getDateOfBirth())
                .gender(user.getGender())
                .phoneNumber(user.getPhone())
                .build();
    }
}
