import React from 'react';
import axios from 'axios';

const authFetch = axios.create({
    baseURL: 'https://songappserverhak.onrender.com',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
}
);

const urlAuth = 'https://songappserverhak.onrender.com/auth';

export {
    authFetch,
    urlAuth
}