import axios from 'axios'

const SONG_URL = 'http://localhost:8080'

const addSong = async (song) => {
    try {
        const response = await axios.post(SONG_URL + '/addSong', song, {
            headers: {
                'Content-Type': 'application/json', // Ensure proper content type
                'Access-Control-Allow-Origin': 'http://localhost:3000' // Origin of your frontend application
            }
        });
        return response.data; // Return the response data
    } catch (error) {
        // Handle errors
        console.error('Error adding song:', error);
        throw error.response.data; // Throw the error response data
    }
};

export default addSong;

export const fetchSongs = async () => {
    try {
        const response = await axios.get(SONG_URL + '/songs');
        return response.data;
    } catch (error) {
        console.error('Error fetching songs:', error);
        throw error;
    }
};

