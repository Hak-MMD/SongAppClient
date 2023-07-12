import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Protect from '../components/Protect';
import { authFetch } from '../axios/custom';
import axios from 'axios';


function EditSong() {

    Protect();
    const navigate = useNavigate();
    let params = useParams();

    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [year, setYear] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');

    const specSong = (id) => {
        console.log(id);
        authFetch(`/song/specSong/${id}`).then((response) => {
            setName(response.data.name);
            setAuthor(response.data.author);
            setYear(response.data.year);
            setAddress(response.data.address);
        });
    };


    const editSong = (id) => {
        if (!name || !author || !year || !address) {
            setError('Please provide all values!');
            setTimeout(() => {
                setError('');
            }, 3000);
        }
        authFetch.put(`/song/editSong/${id}`, { name, author, year, address }).then((response) => {
            navigate(`/specAlbum/${response.data.albumId}`);
        });
    };

    useEffect(() => {
        specSong(params.songId);
    }, [params.songId]);
    return (
        <div>
            <Navbar />

            <div className="forma1">
                <h2>Edit Song!</h2>
                <div className={error == '' ? 'clear-error' : 'error-hand'}>{error}</div>
                <input value={name} onChange={(e) => { setName(e.target.value) }} className='inp' placeholder='Song name...' type="text" />
                <input value={author} className='inp' placeholder='Song author...' onChange={(e) => { setAuthor(e.target.value) }} type="text" />
                <input value={year} className='inp' onChange={(e) => { setYear(e.target.value) }} placeholder='Song year...' type="number" />
                <input value={address} onChange={(e) => { setAddress(e.target.value) }} className='inp' placeholder='Song address...' type="text" />
                {/* <input className='inp' placeholder='Album image' type="file" /> */}
                <button onClick={() => { editSong(params.songId) }} className='inp btn'>Edit</button>
            </div>
        </div>
    )
}
export default EditSong