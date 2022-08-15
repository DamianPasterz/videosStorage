import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

import { useVideoContext } from '../context/VideoContext';
import VideoCard from "./VideoCard"
import Pagination from "./Pagination"
import Modal from '../tools/modal';
import "../index.css"

function PageVideo() {
    const { videos, filterVideos, view, setIsOpen, isOpen, } = useVideoContext();
    const [currentMovie, setCurrentMovie] = useState()
    const [currentPage, setCurrentPage] = useState(1);

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
                )
                }
            </div>
            <Pagination
                currentPage={currentPage}
                videosPerPage={videosPerPage}
                totalVideos={videos.length}
                paginate={paginate}
            />
            <Modal open={isOpen} onClose={() => setIsOpen(false)}  >
                <ReactPlayer
                    url={currentMovie}
                    width='100%'
                    height='100%'
                    controls
                    className='media-player'
                />
            </Modal>
        </div>
    )
}
export default PageVideo

