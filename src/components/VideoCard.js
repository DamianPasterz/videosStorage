import React from 'react'
import '../index.css'
import { useVideoContext } from "../context/Video_context"







function VideoCard({ image, title, channel, views, likes, additionDate, idLocalStorage, favourite }) {
    const { videos, setCurrentMovie } = useVideoContext();



    return (
        <div className='videoCard' key={videos.idLocalStorage} onClick={() => { setCurrentMovie(idLocalStorage) }} >
            <img className='videoCard__thumbnail' src={image} alt="img" />
            <div className='videoCard__info'>


                <div className='videoCard__text' >
                    <h4>{title}</h4>
                    <p>{channel}</p>
                    <p>views{views} </p>
                    <p>likes{likes}</p>
                    <p>addition date: {additionDate}</p>
                    <p> favourite: {favourite}</p>

                    {/* {idLocalStorage} */}

                </div>
            </div>
            {/* <button onClick={() => { deleteVideo(idLocalStorage) }} >delete1</button> */}

        </div>
    )
}

export default VideoCard



