package com.PlayForYouApp.project.services;

import java.util.List;

import com.PlayForYouApp.project.entities.Song;

public interface SongService 
{
	public String addSong(Song song);
	
	public boolean songExists(String name);
	
	public List<Song> fetchAllSongs();
	
	public void updateSong(Song song);
	
	public List<Song> getSongsByIds(List<Integer> songIds);
}
