import React from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import styled from 'styled-components';

import { useVideoContext } from "../context/VideoContext"
import { FlexContanier } from './style/FlexContanier.style'

function VideoCard({ image, title, views, likes, additionDate, idLocalStorage, favourite}) {
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
            <CardVideo key={videos.idLocalStorage} id={view}>
                <img className='videoCard__thumbnail' id={view} src={image} alt="img" onClick={() => { handleShow()}} />
                <h4>{title}</h4>
                <VideoCardBody id={view}>
                <VideoCardText id={view}>
                    <p>VIEWS: {views}</p>
                    <p>LIKES: {likes}</p>
                    <p>{additionDate}</p>
                </VideoCardText >
                <VideoCardAction  id={view}>
                    <ButtonAction favourite={favourite} > 
                    <FaHeart  size='1.5rem'
                        onClick={() => togleFavorite(idLocalStorage)}
                    /></ButtonAction>
                    <ButtonAction>
                    <FaTrashAlt   size='1.5rem'
                        onClick={() => {
                            handleClear(idLocalStorage)
                        }} /></ButtonAction>
                </VideoCardAction>
                </VideoCardBody>
            </CardVideo>
    )
}

export default VideoCard

const ButtonAction = styled.div`
    padding-bottom: 5px;
    padding-top: 10px;
    font-size: 15px;
    text-align: center;
    border-radius: 10px;
    cursor: pointer;
    color:${({favourite})=> favourite===true
            ? 'red'
            : null
            };
        &:hover {
            color:var(--Green2) !important;
         }
`

const CardVideo = styled(FlexContanier)`
        margin-top: 15px;
        padding: 10px;
        border: 1px solid black;
        border-radius: 15px;
        background-color: var(--Green1);
     
    ${({id})=> id === 'list'
        ? ` padding-right: 40px;
            padding-left: 15px;
            height:150px;
            flex-direction: row;`
        :  `flex-direction: column;
            width: 245px;` 
        }
        &:hover{
            box-shadow: 5px 5px 10px var(--Green2);
        }
        & > img {
            width: 168px;
            height: 120px;
            border: 1px solid var(--Green2);
            box-shadow: 5px 5px 15px var(--Green3);
            border-radius: 10px;
            cursor: pointer;
        }
        & > h4 {
            overflow: hidden;
            margin-top: 10px;
            font-size: 16px;
            font-weight: bold;
            ${({id})=> id === 'list'
            ? 'width: 410px;'
            : `white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 210px;`} 
                padding-left: ${({id})=> id === 'list'
            ? `55px;`
            : null}
        }`

const VideoCardBody = styled(FlexContanier)`
    ${({id})=> id === 'list'
        ? `flex-direction: column;
            width:380px;`
        : `width: 210px;`} 
    `

const VideoCardText = styled.div`
    display: flex;
    flex-direction: column;
    width: 160px;
    ${({id})=> id === 'list'
        ? `margin-left:280px;`
        :null} 
    
    & > p {
        flex-direction: row;
        font-size: 15px;
        margin: 0 ;
     
    }
`
const VideoCardAction = styled.div`
 ${({id})=> id === 'list'
    ? ` display: flex;
        justify-content: space-between;
        align-items: flex-end;
        width: 120px;
        height: 40px;
        margin-top: 15px;
        margin-left: 240px;`
   :` margin-top: 5px;`} 
`


