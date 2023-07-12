import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Protect from '../components/Protect';
import '../App.css';
import { authFetch } from '../axios/custom';
import { Link, useNavigate } from 'react-router-dom';


function CreateAlbum() {

    Protect();
    const navigate = useNavigate();


    const [name, setName] = useState('');
    const [note, setNote] = useState('');
    const [genre, setGenre] = useState('');
    const [error, setError] = useState('');
    const [fileName, setFileName] = useState('');


    const onChangeFile = (e) => {
        setFileName(e.target.files[0]);
    };

    const createAlbum = (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append("name", name);
        formData.append("note", note);
        formData.append("genre", genre);
        formData.append("albumImage", fileName);

        try {
            if (!name || !note || !genre || !fileName) {
                setError('Please provide all values!');
                setTimeout(() => {
                    setError('');
                }, 3000);
            }
            authFetch.post('/album/createAlbum', formData).then((response) => {
                navigate(`/specAlbum/${response.data._id}`);
            });
        } catch (error) {

        }
    };
    return (
        <div>
            <Navbar />

            <form onSubmit={(e) => createAlbum(e)} encType="multipart/form-data" className="forma1">
                <h2>Create Album!</h2>
                <div className={error == '' ? 'clear-error' : 'error-hand'}>{error}</div>
                <input onChange={(e) => { setName(e.target.value) }} className='inp' placeholder='Album name...' type="text" />
                <input className='inp' placeholder='Album note...' onChange={(e) => { setNote(e.target.value) }} type="text" />
                <input className='inp' onChange={(e) => { setGenre(e.target.value) }} placeholder='Album genre...' type="text" />
                <label>Choose Album Image</label>
                <input onChange={onChangeFile} fileName="albumImage" className='inp' placeholder='Album image' type="file" />
                <button type='submit' className='inp btn'>Create</button>
            </form>
        </div>
    )
}

export default CreateAlbum