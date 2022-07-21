import React, { useEffect } from 'react';
import { useVideoContext } from '../context/Video_context';

import "../index.css"


const NavbarComponent = () => {
    const { filterAz, filterZa } = useVideoContext();
    const { setVideos } = useVideoContext();

    // useEffect(() => {
    //     console.log("render")
    // }, [videos])




    function HandleClearAll() {
        setVideos([])
    }
    // // function HandleFilterAz() {
    // //     filterAz(videos)
    // //     // setVideos(videos)
    // // }

    // // function HandleFilterZa() {
    // //     filterZa(videos)
    // //     // setVideos(videos)
    // // }

    // // filter AZ
    // function filterAz() {
    //     let videosAZ = videos.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : (b.title.toLowerCase() > a.title.toLowerCase()) ? -1 : 0)
    //     setVideos(videosAZ)
    //     // return setVideos(videosAZ)
    // }


    // // filter ZA
    // function filterZa() {
    //     console.log(videos);
    //     videos.sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase()) ? 1 : (b.title.toLowerCase() < a.title.toLowerCase()) ? -1 : 0)
    //     console.log(videos);

    //     setVideos(videos)
    // }


    return (

        <div className='nawbar__body'>
            <div className='nawbar__logo'>
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
            <div className='nawbar__btn' >
                SORT BY UPLOAD DATE
            </div>
            <div className='nawbar__btn' >

                FAVOURITE
            </div>
        </div>

    );
}

export default NavbarComponent;