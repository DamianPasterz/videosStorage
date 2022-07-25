import React from 'react'
import '../index.css'
import { FaTrashAlt } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';



import { useVideoContext } from "../context/Video_context"







function VideoCard({ image, title, channel, views, likes, additionDate, idLocalStorage, favourite }) {
    const { setVideos, view, setIsOpen, videos } = useVideoContext();


    function HandleDelete(idLocalStorage) {
        let deletedVideos = videos.filter((element) => {
            return element.idLocalStorage !== idLocalStorage
        })
        setVideos(deletedVideos)
    }

    function togleFavorite(id) {
        const favoritesVideos = [...videos].map((video) => {
            if (video.idLocalStorage === id) {
                video.favourite = !video.favourite
            }
            return video
        })
        setVideos(favoritesVideos)
    }
    return (
        <>
            <div className='videoCard' key={videos.idLocalStorage} id={view}>
                <img className='videoCard__thumbnail' id={view} src={image} alt="img" onClick={() => {
                    setIsOpen(true)
                }} />
                <div className='videoCard__text' id={view} >
                    <h4>{title}</h4>
                    {views ? <p>VIEWS: {views} </p> : null}
                    {likes ? <p>LIKES: {likes}</p> : null}
                    <p>addition date: {additionDate}</p>
                </div>
                <div className='videoCard__action' id={view}>
                    <FaHeart className='btn' size='2rem'
                        color={favourite ? 'red' : 'black'}
                        onClick={() => togleFavorite(idLocalStorage)}
                    />
                    <FaTrashAlt className='btn' id='trash'
                        onClick={() => {
                            HandleDelete(idLocalStorage)
                        }} />
                </div>
            </div>
        </>
    )
}

export default VideoCard



