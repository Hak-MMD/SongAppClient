import React from 'react';
import axios from 'axios';

const authFetch = axios.create({
    baseURL: 'https://songappmyhamike.onrender.com',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
}
);

const urlAuth = 'https://songappmyhamike.onrender.com/auth';

export {
    authFetch,
    urlAuth
}