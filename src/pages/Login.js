import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { urlAuth } from '../axios/custom';

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const loginUser = async () => {
        try {
            await axios.post(urlAuth + '/login', { email, password }).then((response) => {
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
            console.log('2');
            navigate('/');
            document.location.reload();

        }
    }, []);
    return (
        <div>
            <Navbar />

            <form className='forma1'>
                <h4>Login</h4>

                <div className={error == '' ? 'clear-error' : 'error-hand'}>{error}</div>
                <input onChange={(e) => { setEmail(e.target.value) }} className='inp' type="email" placeholder='Email...' />
                <input onChange={(e) => { setPassword(e.target.value) }} className='inp' type="password" placeholder='Password...' />
                <button onClick={loginUser} type='button' className="inp waves-effect waves-light btn">Login</button>
                <p style={{ fontSize: 17, marginTop: 10 }}>Don't have an account yet? <Link style={{ color: '#3e5e98' }} to="/register">Register</Link></p>
            </form>
        </div>
    )
}

export default Login