import React from 'react';
import axios from 'axios';

const authFetch = axios.create({
    baseURL: 'https://songapphak.onrender.com',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
}
);

const urlAuth = 'https://songapphak.onrender.com/auth';

export {
    authFetch,
    urlAuth
}