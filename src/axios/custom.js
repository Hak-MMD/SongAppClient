import React from 'react';
import axios from 'axios';

const authFetch = axios.create({
    baseURL: 'https://songapphak.onrender.com/api',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
}
);



export {
    authFetch,
}