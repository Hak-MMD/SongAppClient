import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Protect from '../components/Protect';
import '../App.css';
import { authFetch } from '../axios/custom';
import { Link, useNavigate, useParams } from 'react-router-dom';



function AddSong() {


    Protect();
    const navigate = useNavigate();
    let params = useParams();


    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [year, setYear] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');


    const createAlbum = () => {
        try {
            if (!name || !author || !year || !address) {
                setError('Please provide all values!');
                setTimeout(() => {
                    setError('');
                }, 3000);
            }
            authFetch.post(`/song/addSong/${params.albumId}`, { name, author, year, address }).then((response) => {
                navigate(`/specAlbum/${params.albumId}`);
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <Navbar />

            <div className="forma1">
                <h2>Create Song</h2>
                <div className={error == '' ? 'clear-error' : 'error-hand'}>{error}</div>
                <input onChange={(e) => { setName(e.target.value) }} className='inp' placeholder='Song name...' type="text" />
                <input className='inp' placeholder='Song author...' onChange={(e) => { setAuthor(e.target.value) }} type="text" />
                <input className='inp' onChange={(e) => { setYear(e.target.value) }} placeholder='Song year...' type="number" />
                <input onChange={(e) => { setAddress(e.target.value) }} className='inp' placeholder='Song address...' type="text" />
                {/* <input className='inp' placeholder='Album image' type="file" /> */}
                <button onClick={createAlbum} className='inp btn'>Add</button>
            </div>
        </div>
    )
}

export default AddSong