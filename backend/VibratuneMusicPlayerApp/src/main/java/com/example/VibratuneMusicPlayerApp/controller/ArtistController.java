package com.example.VibratuneMusicPlayerApp.controller;

import com.example.VibratuneMusicPlayerApp.DTO.ArtistDTO;
import com.example.VibratuneMusicPlayerApp.DTO.DetailArtistDTO;
import com.example.VibratuneMusicPlayerApp.service.ArtistService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/artists")
@RequiredArgsConstructor
public class ArtistController {
    private final ArtistService artistService;
    @GetMapping
    public Page<ArtistDTO> getAllArtists(@RequestParam(name="page", defaultValue="0")  int page ,
                                         @RequestParam(name="size", defaultValue="1") int size, @RequestParam(defaultValue="id,asc") String[] sort){

        Sort.Order  sortOrder  =  new Sort.Order(
                sort[1].equalsIgnoreCase("DESC") ?  Sort.Direction.DESC :  Sort.Direction.ASC, sort[0]
        );
        Pageable pageable = PageRequest.of(page,size, Sort.by(sortOrder));
        return  this.artistService.getAllArtists(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getArtistById(@PathVariable Long id){
       try {
           DetailArtistDTO dto =  this.artistService.getArtistById(id);
           return ResponseEntity.ok(dto);
       }catch(Exception ex){
           return ResponseEntity.badRequest().body(ex.getMessage());
       }
    }
    @GetMapping("/top")
    public ResponseEntity<?> getTopMonthlyListenersArtists(@RequestParam(name="count")  int count){
        return ResponseEntity.ok(this.artistService.getTopMonthlyArtists(count));
    }

}
