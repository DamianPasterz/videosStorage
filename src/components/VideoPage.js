import React, { useState, useEffect } from 'react';

import { useVideoContext } from '../context/VideoContext';
import VideoCard from "./VideoCard"
import PaginationModule from "./Pagination"
import "../index.css"
import config from '../tools/config';

function PageVideo() {
    const { videos, filterVideos, view, setCurrentMovie, currentMovie, status } = useVideoContext();
   
    const [currentPage, setCurrentPage] = useState();

    const videosPerPage = 5;
    const indexOfLastVideos = currentPage * videosPerPage
    const indexOfFirstVideo = indexOfLastVideos - videosPerPage
    const currentVideos = filterVideos.slice(indexOfFirstVideo, indexOfLastVideos)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    console.log(status);
    
    useEffect(() => {
        if (status === config.status.ALL) {
            setCurrentPage(currentPage)
            console.log('1');
        }
        if (status === config.status.FAVOURITE) {
            setCurrentPage(1)
        }
      
        console.log('1');
        
    }, [filterVideos])

    useEffect(() => {
        console.log('2');
        
        setCurrentPage(1)
    }, [])

    return (
        <div className='pageVideo'>
            <div className='pageVideos__videos' id={view} >
                {currentVideos.map((video) => {
                    return (
                        <div className='pageVideos__videos' key={video.idLocalStorage} id={view}>
                            <div onClick={() => {
                                setCurrentMovie(video.aUrl)
                            }} >
                                <VideoCard
                                    videos={videos}
                                    key={video.idLocalStorage}
                                    image={video.imageUrl}
                                    title={video.title}
                                    views={video.viewCount}
                                    likes={video.likeCount}
                                    additionDate={video.additionDate}
                                    url={video.aUrl}
                                    favourite={video.favourite}
                                    idLocalStorage={video.idLocalStorage}
                                >
                                </VideoCard>
                            </div>
                        </div>
                    )
                }
            )}
            </div>
            <PaginationModule
                posts = {currentVideos}
                videos = {videos}
                currentPage = {currentPage}
                videosPerPage = {videosPerPage}
                totalVideos = {videos.length}
                paginate = {paginate}
                setCurrentPage = {setCurrentPage}
                filterVideos = {filterVideos}
                currentMovie = {currentMovie}
            />
          
        </div>
    )
}
export default PageVideo

