import React, { useEffect, useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { authFetch, urlAuth } from '../axios/custom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Protect from '../components/Protect';
import Navbar from '../components/Navbar';
import '../App.css';


function Profile() {

    Protect();


    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');

    const userInfo = async (id) => {
        await authFetch.get(`/auth/myAccount/${id}`).then((response) => {
            setUsername(response.data.username);
            setEmail(response.data.email);
        });
    };

    const logoutUser = () => {
        const id = localStorage.getItem('id');
        if (localStorage.getItem('token')) {
            localStorage.clear();
            axios.get(urlAuth + '/myAccount/' + id, {
                transformRequest: (data, headers) => {
                    delete headers.common['Authorization'];
                }
            })
            navigate('/login');
        }
    };

    useEffect(() => {
        userInfo(localStorage.getItem('id'));
    }, []);

    return (
        <div>
            <Navbar />
            <div className="forma1">
                <h2>My Account</h2>
                <div className="set">
                    <h4>Username: {username}</h4>
                </div>

                <div className="set">
                    <h4>Email: {email}</h4>
                </div>
                <div className="test">
                    <button type='button' style={{ width: 200 }} onClick={logoutUser} className="inp"><FiLogOut /> Logout</button>
                </div>
            </div>

        </div>
    )
}

export default Profile