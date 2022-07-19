import React from 'react'
import './VideoCard.css'




function VideoCard({ image, title, channel, views, likes, additionDate }) {
    return (
        <div className='videoCard'>
            <img className='videoCard__thumbnail' src={image} alt="img" />
            <div className='videoCard__info'>
                <div
                    className='videoCard__avatar'
                // alt={channel}
                // src={channelImage}
                />
                <div className='videoCard__text' >
                    <h4>{title}</h4>
                    <p>{channel}</p>
                    <p>views{views} </p>
                    <p>likes{likes}</p>
                    <p>addition date: {additionDate}</p>
                </div>
            </div>
        </div>
    )
}

export default VideoCard



