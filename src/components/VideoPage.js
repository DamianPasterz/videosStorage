import React, { useContext, useState } from 'react';
import "./VideoPage.css";
import VideoCard from "./VideoCard"
import { useVideoContext } from '../context/Video_context';
import Modal from '../tools/modal';
import ReactPlayer from 'react-player';
import NavbarComponent from "./Navbar"
import "../index.css"





function RecomendetVideo() {
    const { videos, setVideos } = useVideoContext();
    // const { deleteVideo } = useVideoContext();



    const [isOpen, setIsOpen] = useState(false)
    const [currentMovie, setCurrentMovie] = useState()
    const [favourite, setFavourite] = useState(false)


    function HandleDelete(idLocalStorage) {
        let deletedVideos = videos.filter((element) => {


            return element.idLocalStorage !== idLocalStorage
        })
        setVideos(deletedVideos)
    }
    function Handlefav(idLocalStorage) {

        // setFavourite(!favourite)
    }


    return (
        <div className='recomendetVideo'>
            <NavbarComponent />

            <div className='recomendedVideos__videos'>
                {videos.map(video => {
                    return (
                        <div className='recomendedVideos__videos__videos' key={video.idLocalStorage}>
                            <div onClick={() => {
                                setIsOpen(true)
                                setCurrentMovie(video.aUrl)
                            }} >
                                <VideoCard

                                    image={video.imageUrl}

                                    title={video.title}
                                    views={video.viewCount}

                                    likes={video.likeCount}
                                    additionDate={video.additionDate}
                                    url={video.aUrl}
                                    favourite={favourite ? "tak" : "nie"}
                                    // button={deleteVideo}
                                    idLocalStorage={video.idLocalStorage}

                                />

                            </div>


                            <button className='btn' onClick={() => { HandleDelete(video.idLocalStorage) }}>
                                DELETE
                            </button>
                            <button className='btn__fav' onClick={() => { Handlefav(video.favourite) }}>
                                FAVOURITE
                            </button>
                        </div>


                    )



                }
                )
                }

            </div>

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

export default RecomendetVideo

