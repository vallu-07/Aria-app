import React, { useState } from 'react'
import addSong from '../services/SongService'

function AddSong() {

    const [name, setName] = useState("")
    const [artist, setArtist] = useState("")
    const [genre, setGenre] = useState("")
    const [link, setLink] = useState("")

    const [msg, setMsg] = useState("")

    const AddSong = async (e) => {
        e.preventDefault();

        const song = {
            name, artist, genre, link
        };

        try {
            const response = await addSong(song);
            if (response) {
                console.log(response);
                setMsg(response);
                // Redirect or handle success as needed
            }
            //  else {
            //     // Handle non-200 status codes if necessary
            //     console.error('Error:', response.data);
            //     setMsg(response.data);
            // }
        } catch (error) {
            console.error('Error:', error);
            setMsg(error); // Access error response data directly
        }
    };


    return (
        <div>
            <div className='container'>
                <br /><br />
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3 shadow">
                        <h2 className='text-center m-2'>Add Song</h2>
                        <div className="card-body">
                            <form onSubmit={AddSong} method='post'>
                                <div className="form-group mb-2">
                                    <label className='form-label'>Name:</label>
                                    <input type="text"
                                        placeholder='Enter song name'
                                        name='name'
                                        value={name}
                                        className={`form-control`}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className='form-label'>Artist:</label>
                                    <input type="text"
                                        placeholder='Enter artist name'
                                        name='artist'
                                        value={artist}
                                        className={`form-control`}
                                        onChange={(e) => setArtist(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className='form-label'>Genre:</label>
                                    <input type="text"
                                        placeholder='Enter genre name'
                                        name='genre'
                                        value={genre}
                                        className={`form-control`}
                                        onChange={(e) => setGenre(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className='form-label'>Link:</label>
                                    <input type="text"
                                        placeholder='Enter song link'
                                        name='link'
                                        value={link}
                                        className={`form-control`}
                                        onChange={(e) => setLink(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='text-center'>
                                    <button className='btn btn-success' type='submit' value='SUBMIT FORM'>Add Song</button>
                                </div>
                            </form>
                        </div>
                        {msg && <h6 className="text-center border border-dark p-2 rounded text-danger">{msg}</h6>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddSong