import React, { useContext, useState } from 'react';
import "./VideoPage.css";
import VideoCard from "./VideoCard"
import { useVideoContext } from '../context/Video_context';
import Modal from '../tools/modal';
import ReactPlayer from 'react-player';
import NavbarComponent from "./Navbar"
import "../index.css"





function RecomendetVideo() {
    const { videos, setVideos, filterVideos } = useVideoContext();
    // const { deleteVideo } = useVideoContext();



    const [isOpen, setIsOpen] = useState(false)
    const [currentMovie, setCurrentMovie] = useState()
    // const [favourite, setFavourite] = useState(false)
    // const [favouriteVideos, setFavouriteVideos] = useState([])


    function HandleDelete(idLocalStorage) {
        let deletedVideos = videos.filter((element) => {


            return element.idLocalStorage !== idLocalStorage
        })
        setVideos(deletedVideos)
    }



    // const Handlefav = () => {
    //     setFavouriteVideos(videos.map((item) => {

    //         if (item.idLocalStorage === videos.idLocalStorage) {
    //             console.log(item.title);
    //             return {
    //                 ...item, favourite: !item.favourite
    //             }



    //         }
    //         return item
    //     }))

    //     console.log(favourite)
    // setFavourite(!favourite)

    // return {
    //     ...item, favourite: !item.favourite
    // }

    // }


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
        <div className='recomendetVideo'>
            <NavbarComponent />

            <div className='recomendedVideos__videos'>
                {filterVideos.map((video, index) => {
                    return (
                        <div className='recomendedVideos__videos__videos' key={index} >
                            <div onClick={() => {
                                setIsOpen(true)
                                setCurrentMovie(video.aUrl)
                            }} >
                                <VideoCard
                                    video={video}

                                    setVideos={setVideos}
                                    vodeos={videos}
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

                            <input type="checkbox" onChange={() => togleFavorite(video.idLocalStorage)} checked={video.favourite} />
                            <button className='btn' onClick={() => { HandleDelete(video.idLocalStorage) }}>
                                DELETE
                            </button>
                            {/* <button className='btn__fav' onClick={() => {
                                Handlefav(video.idLocalStorage)
                                // setCurrentMovie(video.idLocalStorage)

                            }}>
                                FAVOURITE
                            </button> */}
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

