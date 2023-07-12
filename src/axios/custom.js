import React from 'react';
import axios from 'axios';

const authFetch = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
}
);

const urlAuth = 'http://localhost:5000/api/auth';

export {
    authFetch,
    urlAuth
}