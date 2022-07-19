import React, { useContext } from 'react';
import "./VideoPage.css";
import VideoCard from "./VideoCard"
import { useVideoContext } from '../context/Video_context';


function RecomendetVideo() {
    const { videoLS } = useVideoContext();
    console.log(videoLS);
    console.log(videoLS.imageUrl);
    console.log(videoLS.additionDate);


    return (
        <div className='recomendetVideo'>
            <h2>
                Last added video
            </h2>

            <div className='recomendedVideos__videos'>
                {videoLS.map(video => {
                    return (
                        <VideoCard key={video.idLocalStorage}
                            title={video.title}
                            views={video.viewCount}
                            image={video.imageUrl}
                            likes={video.likeCount}
                            additionDate={video.additionDate}



                        />
                    )
                })}




            </div>
        </div>
    )
}

export default RecomendetVideo
