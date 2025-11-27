import React, { useState, useEffect } from 'react';
import { BiPlay, BiPause } from 'react-icons/bi';
import { Table, Button } from 'react-bootstrap';
import { fetchSongs } from '../services/SongService';
import '../../src/App.css';

function Songs() {
    const [songs, setSongs] = useState([]);
    const [playingSongId, setPlayingSongId] = useState(null);
    const [audio, setAudio] = useState(null);

    useEffect(() => {
        const fetchAllSongs = async () => {
            try {
                const songsData = await fetchSongs();
                setSongs(songsData);
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };

        fetchAllSongs();
    }, []);

    useEffect(() => {
        if (audio) {
            const handleEnded = () => {
                setPlayingSongId(null);
            };
            audio.addEventListener('ended', handleEnded);
            return () => {
                audio.removeEventListener('ended', handleEnded);
            };
        }
    }, [audio]);

    const togglePlay = (songId, songUrl) => {
        if (playingSongId === songId) {
            // Pause the audio if the clicked song is already playing
            if (!audio.paused) {
                audio.pause();
                setPlayingSongId(null);
            }
        } else {
            // Stop the currently playing song and start the new one
            if (audio) {
                audio.pause();
            }
            setPlayingSongId(songId);
            const newAudio = new Audio(songUrl);
            newAudio.play();
            setAudio(newAudio);
        }
    };

    return (
        <div className="container">
            <h2 className="mt-5 mb-4 text-center">All Songs</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Artist</th>
                        <th>Genre</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {songs.map((song, index) => (
                        <tr key={song.id}>
                            <td>{index + 1}</td>
                            <td>{song.name}</td>
                            <td>{song.artist}</td>
                            <td>{song.genre}</td>
                            <td>
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => togglePlay(song.id, song.link)}
                                >
                                    {playingSongId === song.id && audio && !audio.paused ? <BiPause /> : <BiPlay />}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Songs;
