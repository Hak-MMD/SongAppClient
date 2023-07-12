import React from 'react'
import { Link } from 'react-router-dom';
import '../App.css';

function Navbar() {
    return (
        <div className='navbar'>
            <div className="part1">
                <h1>Song App</h1>
                <h5>Add your favorite songs!</h5>
            </div>
            <div className="part2">
                <ul>
                    <li><a><Link to='/'>Albums</Link></a></li>
                    <li><a><Link to='/profile'>Profile</Link></a></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar