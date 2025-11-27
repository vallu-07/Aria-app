package com.PlayForYouApp.project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.PlayForYouApp.project.entities.Song;

public interface SongRepository extends JpaRepository<Song, Integer>
{
	public Song findByName(String name);
}
