package com.example.VibratuneMusicPlayerApp.controller;

import com.example.VibratuneMusicPlayerApp.DTO.AlbumDTO;
import com.example.VibratuneMusicPlayerApp.model.Album;
import com.example.VibratuneMusicPlayerApp.service.AlbumService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/albums")
@RequiredArgsConstructor
public class AlbumController {
    @Autowired
    private  final AlbumService albumService;
    @GetMapping
    public Page<AlbumDTO> getAllAlbums(@RequestParam(name="page", defaultValue="0")  int page ,
                             @RequestParam(name="size", defaultValue="1") int size, @RequestParam(defaultValue="id,asc") String[] sort
    ) {

        Sort.Order  sortOrder  =  new Sort.Order(
                sort[1].equalsIgnoreCase("DESC") ?  Sort.Direction.DESC :  Sort.Direction.ASC, sort[0]
        );
        Pageable pageable = PageRequest.of(page,size, Sort.by(sortOrder));
        return albumService.getAllAlbums(pageable);
    }




    @GetMapping("/{id}")
    public ResponseEntity<?> getAlbumById(@PathVariable(name ="id") Long id){
        try {
            AlbumDTO dto =  albumService.getAlbumById(id);
            return ResponseEntity.ok(dto);
        }catch(Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
    @GetMapping("/top")
    public ResponseEntity<?> getTopAlbums(@RequestParam(name ="count") int count){
        return ResponseEntity.ok(albumService.getTopAlbums(count));
    }
}
