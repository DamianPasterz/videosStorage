import React, { useEffect } from 'react';
import { useVideoContext } from '../context/Video_context';
import "../index.css"
import { FaListAlt } from "react-icons/fa"
import { BsFillGridFill } from "react-icons/bs"
import { FaHeart } from 'react-icons/fa';

const NavbarComponent = () => {
    const { filterAz, filterZa, filterUploadDate } = useVideoContext();
    const { setVideos, setStatus, setView, HandleDemo } = useVideoContext();
    function HandleClearAll() {
        setVideos([])
    }
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
            <div className='nawbar__btn' onClick={HandleDemo} >
                DEMO
            </div>
            <div className='nawbar__btn' onClick={HandleClearAll} >
                CLEAR ALL
            </div>
            <div className='nawbar__btn' onClick={filterAz} >
                SORT A-Z
            </div>
            <div className='nawbar__btn' onClick={filterZa} >
                SORT Z-A
            </div>
            <div className='nawbar__btn' onClick={filterUploadDate} >
                SORT BY UPLOAD DATE
            </div>
            <div className='nawbar__btn' onClick={handleStatus} >

                FAVOURITE <FaHeart size='1.5rem' color='red' />
            </div>
            <div className='nawbar__view'>
                <FaListAlt className='nawbar__view__btn' size='2.5rem' color='smokdwhite' onClick={() => { setView('list') }} />
                <BsFillGridFill className='nawbar__view__btn' size='2.5rem' onClick={() => { setView('grid') }} />
            </div>

        </div>

    );
}

export default NavbarComponent;