import React from 'react';
import { useVideoContext } from '../context/VideoContext';
import "../index.css"

import { FaHeart } from 'react-icons/fa';

const NavbarComponent = () => {
    const { setStatus } = useVideoContext();

    const handleAll = () => {
        setStatus("all")
    }
    const handleStatus = (e) => {
        setStatus("favourite")
    }
    return (

        <div className='nawbar__body'>
            <div className='nawbar__btn' onClick={handleAll}>
                All VIDEOS
            </div>
            <div className='nawbar__btn' onClick={handleStatus} >
                FAVOURITE <FaHeart size='1.5rem' color='red' id='heart' />
            </div>


        </div>

    );
}

export default NavbarComponent;