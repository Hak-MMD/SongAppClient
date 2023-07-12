import React, { useEffect, useState } from 'react';
import Protect from '../components/Protect';
import Navbar from '../components/Navbar';
import { BsThreeDotsVertical } from 'react-icons/bs';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { authFetch } from '../axios/custom';


function Main() {

    Protect();

    const navigate = useNavigate();

    const [myAlbums, setMyAlbums] = useState([]);
    const [search, setSearch] = useState('');


    const allAlbums = () => {
        try {
            authFetch.get('/album/myAlbums').then((response) => {
                setMyAlbums(response.data);
            });
            console.log('test');
        } catch (error) {
            console.log(error);
        }
    };

    const deleteQuestion = (id) => {
        authFetch.delete(`/album/delAlbum/${id}`).then(() => {
            // navigate('/allQuestionsAuth');
            document.location.reload();
        });
    };

    useEffect(() => {
        allAlbums();
    }, [])
    return (
        <div>
            <Navbar />
            <div className="main">
                <div className="top-block">
                    <input onChange={(e) => { setSearch(e.target.value) }} placeholder='Search album...' type="text" />
                </div>
                <div className="info">
                    <h3> Albums Found</h3>
                    <button onClick={() => { navigate('/createAlbum/') }} className='inp'>Create Album</button>
                </div>
                <div className="bottom-block">
                    <div className="card" id='card1'>
                        <img src='/uploads/main.jpg' alt="" />
                        <h3 onClick={() => { navigate('/allSongs') }}>All Songs Album</h3>
                        <div className="card-info">
                            {/* <button onClick={() => { navigate('/editAlbum/' + album._id) }} className='inp'>Edit</button>
                            <button onClick={() => { deleteQuestion(album._id) }} className='inp'>Delete</button> */}
                        </div>
                    </div>

                    {
                        myAlbums.filter((album) => {
                            if (search == '') {
                                return (album);
                            } else if (album.name.toLowerCase().includes(search.toLowerCase())) {
                                return album;
                            }

                        }).map((album) => {
                            return (
                                <div key={album._id} className="card imag">
                                    <img src={`/uploads/${album.albumImage}`} alt="" />
                                    <h3 onClick={() => { navigate('/specAlbum/' + album._id) }}>{album.name}</h3>
                                    <h4>Genre: {album.genre}</h4>
                                    <span>{album.updatedAt}</span>
                                    <div className="card-info">
                                        <button onClick={() => { navigate('/editAlbum/' + album._id) }} className='inp'>Edit</button>
                                        <button onClick={() => { deleteQuestion(album._id) }} className='inp'>Delete</button>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default Main