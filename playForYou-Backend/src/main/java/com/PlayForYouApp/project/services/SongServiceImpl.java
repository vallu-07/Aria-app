package com.PlayForYouApp.project.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.PlayForYouApp.project.entities.Song;
import com.PlayForYouApp.project.repositories.SongRepository;

@Service
public class SongServiceImpl implements SongService
{
	@Autowired
	SongRepository repo;

	@Override
	public String addSong(Song song) {
		repo.save(song);
		return "Song Added";
	}

	@Override
	public boolean songExists(String name) {
	    Song song = repo.findByName(name);
	    return song != null; // Returns true if a song with the given name exists in the database
	}


	@Override
	public List<Song> fetchAllSongs() {
		return repo.findAll();
	}

	@Override
	public void updateSong(Song song) {
		repo.save(song);
	}

	@Override
	public List<Song> getSongsByIds(List<Integer> songIds) {
		return repo.findAllById(songIds);
	}




	
	
}
