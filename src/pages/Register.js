import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const registerUser = async () => {
        try {
            await axios.post('/auth/register', { username, email, password }).then((response) => {
                localStorage.setItem('id', response.data._id);
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('token', response.data.token);
                if (localStorage.getItem('token')) {
                    navigate('/profile');
                    document.location.reload();
                }
            });
        } catch (error) {
            setError(error.response.data.message);
            setTimeout(() => {
                setError('');
            }, 3000);
        }


    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/');
            document.location.reload();

        }
    }, []);

    return (
        <div>
            <Navbar />
            <form className='forma1'>
                <h4>Register</h4>

                <div className={error == '' ? 'clear-error' : 'error-hand'}>{error}</div>
                <input onChange={(e) => { setUsername(e.target.value) }} className='inp' type="text" placeholder='Username...' />
                <input onChange={(e) => { setEmail(e.target.value) }} className='inp' type="email" placeholder='Email...' />
                <input onChange={(e) => { setPassword(e.target.value) }} className='inp' type="password" placeholder='Password...' />
                <button type='button' onClick={registerUser} className="inp waves-effect waves-light btn">Register</button>
                <p style={{ fontSize: 17, marginTop: 10 }}>Have an account? <Link style={{ color: '#3e5e98' }} to="/login">Login</Link></p>
            </form>

        </div>
    )
}

export default Register