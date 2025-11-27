package com.PlayForYouApp.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PlayForYouApp.project.entities.Song;
import com.PlayForYouApp.project.services.SongService;

@CrossOrigin("*")
@RestController
@RequestMapping
public class SongController 
{
	@Autowired
	SongService songServ;

	@PostMapping("/addSong")
	public ResponseEntity<String> addSong(@RequestBody Song song) {
		boolean songStatus = songServ.songExists(song.getName());

		if (!songStatus) {
			songServ.addSong(song);
			return ResponseEntity.ok("Song added successfully");
		} else {
			return ResponseEntity.badRequest().body("Song already exists");
		}
	}

	@GetMapping("/songs")
	public List<Song> viewSongs() {
		return songServ.fetchAllSongs();
	}

	@GetMapping("/custSongs")
	public String viewCustomerSongs(Model model) {
		boolean primeCustomerStatus = false;
		if(primeCustomerStatus==true)
		{
			List<Song> songsList = songServ.fetchAllSongs();
			model.addAttribute("Song", songsList);
			return "displaySongs";
		}
		else
		{
			return "makePayment";
		}
	}
	

}
