import React from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';

import { useVideoContext } from "../context/VideoContext"
import '../index.css'

function VideoCard({ image, title, views, likes, additionDate, idLocalStorage, favourite }) {
    const { setVideos, view, videos, handleClear, handleShow } = useVideoContext();

    function togleFavorite(idLocalStorage) {
        const favoritesVideos = [...videos].map((video) => {
            if (video.idLocalStorage === idLocalStorage) {
                video.favourite = !video.favourite
            }
            return video
        })
        setVideos(favoritesVideos)
    }

    return (
        <>
            <div className='videoCard' key={videos.idLocalStorage} id={view}>
                <img className='videoCard__thumbnail' id={view} src={image} alt="img" onClick={() => { handleShow()}} />
                <div className='videoCard__text' id={view}>
                    <h4>{title}</h4>
                    <p>VIEWS: {views}</p>
                    <p>LIKES: {likes}</p>
                    <p>addition date: {additionDate}</p>
                </div>
                <div className='videoCard__action' id={view}>
                    <FaHeart className='btn' id='heart' size='2rem'
                        color={favourite ? 'red' : 'black'}
                        onClick={() => togleFavorite(idLocalStorage)}
                    />
                    <FaTrashAlt className='btn' id='trash'
                        onClick={() => {
                            handleClear(idLocalStorage)
                        }} />
                </div>
            </div>
        </>
    )
}

export default VideoCard
