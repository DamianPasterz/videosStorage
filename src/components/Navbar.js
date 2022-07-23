import React, { useEffect } from 'react';
import { useVideoContext } from '../context/Video_context';
import "../index.css"


const NavbarComponent = () => {
    const { filterAz, filterZa, filterUploadDate } = useVideoContext();
    const { setVideos, setStatus } = useVideoContext();


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
                <p> Movie library</p>
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

                FAVOURITE
            </div>
        </div>

    );
}

export default NavbarComponent;