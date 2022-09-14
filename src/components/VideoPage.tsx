import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useVideoContext, Video } from '../context/VideoContext';
import VideoCard from "./VideoCard"
import PaginationModule from "./Pagination"
import config from '../tools/config';
import { FlexContanier } from "./style/FlexContanier.style";

const PageVideo=() => {
    const { videos, filterVideos, view, setCurrentMovie, currentMovie, status } = useVideoContext();
   
    const [currentPage, setCurrentPage] = useState<number>(1);

    const videosPerPage:number = 8;
    const indexOfLastVideos:number = currentPage * videosPerPage
    const indexOfFirstVideo:number = indexOfLastVideos - videosPerPage
    const currentVideos:Video[] = filterVideos.slice(indexOfFirstVideo, indexOfLastVideos)
    const paginate = (pageNumber:number) => setCurrentPage(pageNumber)
    
    useEffect(() => {
        if (status === config.status.ALL) {
            setCurrentPage(currentPage)
        }

        if (status === config.status.FAVOURITE) {
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterVideos])

    useEffect(() => {
        setCurrentPage(1)
    }, [])

    return (
        <VideoPage>
            <VideoPageVideo id={view} >
                {currentVideos.map((video) => {
                    return (
                        <VideoPageVideo key={video.idLocalStorage} id={view}>
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
                        </VideoPageVideo>
                    )
                }
            )}
            </VideoPageVideo>
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
        </VideoPage>
    )
}
export default PageVideo

const VideoPage = styled(FlexContanier)`
flex-direction: column;
  ${({id})=>id=== 'list'? "":' width: 1110px;  ' } 
`
const VideoPageVideo = styled(FlexContanier)`
    ${({id})=>id=== 'list'?"":'display: flex;  ' }
    padding-left: 13px;
    padding-right: 13px;
    flex-wrap: wrap;
    justify-content: center;
`