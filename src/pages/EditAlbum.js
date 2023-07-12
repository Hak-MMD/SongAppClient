import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Protect from '../components/Protect';
import { authFetch } from '../axios/custom';
import axios from 'axios';


function EditAlbum() {

    Protect();
    const navigate = useNavigate();
    let params = useParams();

    const [name, setName] = useState('');
    const [note, setNote] = useState('');
    const [genre, setGenre] = useState('');
    const [error, setError] = useState('');
    const [result, setResult] = useState('');
    const [fileName, setFileName] = useState('');


    const specAlbum = (id) => {
        console.log(id);
        authFetch(`/album/specAlbum/${id}`).then((response) => {
            setName(response.data.name);
            setNote(response.data.note);
            setGenre(response.data.genre);
        });
    };

    const onChangeFile = (e) => {
        setFileName(e.target.files[0]);
    };


    const editAlbum = (id, e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append("name", name);
        formData.append("note", note);
        formData.append("genre", genre);
        formData.append("albumImageName", fileName);

        if (!name || !note || !genre) {
            setError('Please provide all values!');
            setTimeout(() => {
                setError('');
            }, 3000);
        }
        authFetch.put(`/album/editAlbum/${id}`, formData).then((response) => {
            navigate(`/specAlbum/${response.data._id}`);
        });
        setResult('Album was updated!');
        setTimeout(() => {
            setResult('');
        }, 3000);
    };

    useEffect(() => {
        specAlbum(params.albumId);
    }, []);
    return (
        <div>
            <Navbar />

            <form onSubmit={(e) => editAlbum(params.albumId, e)} encType="multipart/form-data" className="forma1">
                <h2>Edit Album!</h2>
                <div className={error == '' ? 'clear-error' : 'result-hand'}>{result}</div>
                <div className={error == '' ? 'clear-error' : 'error-hand'}>{error}</div>
                <input value={name} onChange={(e) => { setName(e.target.value) }} className='inp' placeholder='Album name...' type="text" />
                <input value={note} className='inp' placeholder='Album note...' onChange={(e) => { setNote(e.target.value) }} type="text" />
                <input value={genre} className='inp' onChange={(e) => { setGenre(e.target.value) }} placeholder='Album genre...' type="text" />
                <label>Choose Album Image</label>
                <input files={fileName} onChange={onChangeFile} fileName="albumImageName" className='inp' placeholder='Album image' type="file" />
                <button type='submit' className='inp btn'>Edit</button>
            </form>
        </div>
    )
}

export default EditAlbum