import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Protect from '../components/Protect';
import { authFetch } from '../axios/custom';
// import axios from 'axios';
import '../App.css';

function AllAlbum() {

    Protect();

    const navigate = useNavigate();
    let params = useParams();


    const [songs, setSongs] = useState([]);
    const [search, setSearch] = useState('');

    const allSongs = () => {
        authFetch.get('/song/allMySongs').then((response) => {
            setSongs(response.data);
        });
    };

    useEffect(() => {
        allSongs();
    }, []);

    return (
        <div>
            <Navbar />

            <div className="spec">
                <div className="spec-info">
                    <img src="/uploads/main.jpg" alt="" />
                    <h2>All Songs Album</h2>
                    <h4>Genre: Mixed</h4>
                    <p>This is all songs album! Songs from all your albums are here!</p>

                    {/* <div className="spec-option">
                        <button onClick={() => { navigate(`/editAlbum/${params.albumId}`) }} className='inp'>Edit</button>
                        <button onClick={() => { deleteQuestion(params.albumId) }} className='inp'>Delete</button>
                    </div> */}
                </div>
                {/* <hr className='hr-line' /> */}

                <div className="spec-main">
                    <div className="top-block">
                        <input onChange={(e) => { setSearch(e.target.value) }} placeholder='Search song by name...' type="text" />
                    </div>

                    <div className="songs">
                        <table>
                            <tr>
                                <th>Name</th>
                                <th>Author</th>
                                <th>Year</th>
                                <th>Link Address</th>
                            </tr>


                            {
                                songs.filter((song) => {
                                    if (search == '') {
                                        return (song);
                                    } else if (song.name.toLowerCase().includes(search.toLowerCase())) {
                                        return song;
                                    }

                                }).map((song) => {
                                    return (
                                        <tr className='song'>
                                            <td>{song.name}</td>
                                            <td>{song.author}</td>
                                            <td>{song.year}</td>
                                            <td><a href={song.address} target="_blank" className='inp btn'>Listen</a>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </table>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllAlbum