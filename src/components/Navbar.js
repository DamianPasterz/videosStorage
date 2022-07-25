import React from 'react';
import { useVideoContext } from '../context/Video_context';
import "../index.css"

import { FaHeart } from 'react-icons/fa';

const NavbarComponent = () => {
    const { setStatus } = useVideoContext();

    const HandleAll = () => {
        setStatus("all")
    }
    const handleStatus = (e) => {
        setStatus("favourite")
    }
    return (

        <div className='nawbar__body'>
            <div className='nawbar__btn' onClick={HandleAll}>
                <p> All VIDEOS</p>
            </div>

            <div className='nawbar__btn' onClick={handleStatus} >
                FAVOURITE <FaHeart size='1.5rem' color='red' id='heart' />
            </div>


        </div>

    );
}

export default NavbarComponent;