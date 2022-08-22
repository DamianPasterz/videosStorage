import React, { useState, useEffect } from 'react';

import { useVideoContext } from '../context/VideoContext';
import VideoCard from "./VideoCard"
import PaginationModule from "./Pagination"
import "../index.css"

function PageVideo() {
    const { videos, filterVideos, view, setCurrentMovie } = useVideoContext();
   
    const [currentPage, setCurrentPage] = useState(4);

    const videosPerPage = 5;
    const indexOfLastVideos = currentPage * videosPerPage
    const indexOfFirstVideo = indexOfLastVideos - videosPerPage
    const currentVideos = filterVideos.slice(indexOfFirstVideo, indexOfLastVideos)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    useEffect(() => {
        setCurrentPage(1)
    }, [filterVideos])
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
            />
          
        </div>
    )
}
export default PageVideo

