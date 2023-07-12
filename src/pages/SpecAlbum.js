import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Protect from '../components/Protect';
import { authFetch } from '../axios/custom';
import axios from 'axios';
import { GrEdit } from 'react-icons/gr';
import { AiOutlineDelete } from 'react-icons/ai';
import '../App.css';


function SpecAlbum() {

    Protect();

    const navigate = useNavigate();
    const params = useParams();

    const [songs, setSongs] = useState([]);
    const [search, setSearch] = useState('');
    const [name, setName] = useState('');
    const [note, setNote] = useState('');
    const [genre, setGenre] = useState('');
    const [albumImage, setAlbumImage] = useState('');

    const specAlbum = (id) => {
        authFetch(`/album/specAlbum/${id}`).then((response) => {
            setName(response.data.name);
            setNote(response.data.note);
            setGenre(response.data.genre);
            setAlbumImage(response.data.albumImage);
        });
    };

    const deleteQuestion = (id) => {
        authFetch.delete(`/album/delAlbum/${id}`).then(() => {
            navigate('/');
            // document.location.reload();
        });
    };

    const allSongs = (id) => {
        authFetch.get(`/song/mySongs/${id}`).then((response) => {
            setSongs(response.data);
        });
    };
    const deleteSong = (id) => {
        authFetch.delete(`/song/delSong/${id}`).then(() => {
            document.location.reload();
        });
    };

    useEffect(() => {
        allSongs(params.albumId);
    }, []);

    useEffect(() => {
        specAlbum(params.albumId);
    }, []);


    return (
        <div>
            <Navbar />
            <div className="spec">
                <div className="spec-info">
                    <img src={`/uploads/${albumImage}`} alt="" />
                    <h2>{name}</h2>
                    <h4>Genre: {genre}</h4>
                    <p>{note}</p>

                    <div className="spec-option">
                        <button onClick={() => { navigate(`/editAlbum/${params.albumId}`) }} className='inp'>Edit</button>
                        <button onClick={() => { deleteQuestion(params.albumId) }} className='inp'>Delete</button>
                    </div>
                </div>

                <div className="spec-main">
                    <div className="top-block">
                        <input onChange={(e) => { setSearch(e.target.value) }} placeholder='Search song by name...' type="text" />
                        <button onClick={() => { navigate(`/addSong/${params.albumId}`) }} className='inp'>Add Song</button>
                    </div>

                    <div className="songs">
                        <table>
                            <tr>
                                <th>Name</th>
                                <th>Author</th>
                                <th>Year</th>
                                <th>Link Address</th>
                                <th>Options</th>
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
                                            <td><button onClick={() => { navigate(`/editSong/${song._id}`) }} className='inp btn'><GrEdit /></button>
                                                <button onClick={() => { deleteSong(song._id) }} className='inp btn'><AiOutlineDelete /></button></td>
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

export default SpecAlbum