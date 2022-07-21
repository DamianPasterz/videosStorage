import React, { useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from '../tools/useLokalStorageHook';
import moment from 'moment';








export const VideoContext = React.createContext();
export const VideoProvider = ({ children }) => {
    const [videos, setVideos] = useLocalStorage("videos", [])

    let sortVideos = [...videos]




    useEffect(() => {
        console.log("render")
    }, [videos])




    // filter AZ
    function filterAz() {
        sortVideos = sortVideos.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : (b.title.toLowerCase() > a.title.toLowerCase()) ? -1 : 0)
        setVideos(sortVideos)

    }


    // filter ZA
    function filterZa() {
        sortVideos = sortVideos.sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase()) ? 1 : (b.title.toLowerCase() < a.title.toLowerCase()) ? -1 : 0)
        setVideos(sortVideos)
    }


    // filter AZ
    function filterUploadDate() {
        sortVideos = sortVideos.sort((a, b) => (a.additionDate.toLowerCase() > b.additionDate.toLowerCase()) ? 1 : (b.additionDate.toLowerCase() > a.additionDate.toLowerCase()) ? -1 : 0)
        setVideos(sortVideos)
        return setVideos(sortVideos)
    }

    async function getYtObject(newProvider, newId, inputSearch) {




        const fetchUrl = `https://www.googleapis.com/youtube/v3/videos?id=${newId}&key=${"AIzaSyAdhgdhqdLwgz6ow0-jVb-08MJbsUDgPlo"}
        &part=snippet,statistics&fields=items(id,snippet(title,thumbnails(default(url))),statistics(viewCount,likeCount))`

        const movieUrl = `https://www.youtube.com/watch?v=${newId}`;

        const response = await fetch(fetchUrl);

        const data = await response.json()

        console.log(data);
        destructurizeYoutubeObject(data, movieUrl)



        return

    }

    //destrukturyzacja YT

    const destructurizeYoutubeObject = (data, movieUrl) => {
        console.log(movieUrl);
        const {
            id,
            snippet: { title },
            snippet: {
                thumbnails: { default: {
                    url,
                } }

            },



            statistics: { viewCount, likeCount },
        } = data.items[0];


        console.log(data.items[0]);

        const newItem = {
            id,
            idLocalStorage: uuidv4(),
            title,
            viewCount,
            likeCount,
            provider: 'YOUTUBE',
            aUrl: movieUrl,
            imageUrl: url,
            additionDate: moment().add(3, 'days').calendar(),
            favourite: false,
        }

        if (videos.find(item => item.id === newItem.id)) {
            return

        }
        setVideos([...videos, newItem])

        return console.log(newItem);
    };


    async function getVimeoObject(newProvider, newId, inputSearch) {


        const fetchUrl = `https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/${newId}`

        const movieUrl = `https://www.vimeo.com/${newId}`;

        const response = await fetch(fetchUrl);

        const data = await response.json()
        console.log(data);
        destructurizeVimeoObject(data, movieUrl)

        return
    }


    const destructurizeVimeoObject = (data, movieUrl) => {
        const {

            title,
            thumbnail_url,
            video_id,

        } = data;
        console.log(data);
        console.log(video_id);



        const newItem = {
            id: video_id,
            idLocalStorage: uuidv4(),
            title,
            imageUrl: thumbnail_url,
            provider: "VIMEO",
            additionDate: moment().add(3, 'days').calendar(),
            aUrl: movieUrl,
            favourite: false,
        };

        console.log(newItem);
        console.log(videos);
        if (videos.find(item => item.id === newItem.id)) {
            return console.log("już jest");
        }

        setVideos([...videos, newItem])



    };

    function deleteVideo(videos, idLocalStorage) {
        let deletedVideos = videos.filter((element) => {

            return element.idLocalStorage !== idLocalStorage
        })
        setVideos([deletedVideos])
    }

    // // filter AZ
    // function filterAz(title) {
    //     let videosAZ = videos.sort((a, b) => a.video.title - b.video.title)
    //     console.log(`sortaz${videosAZ}`);
    //     setVideos(videosAZ)
    //     return
    // }



    return (
        <VideoContext.Provider
            value={{
                ...videos,
                getYtObject,
                getVimeoObject,
                destructurizeYoutubeObject,
                // useLocalStorage,
                // filterAz,
                setVideos,
                videos,
                deleteVideo,
                filterAz,
                filterZa,
                filterUploadDate





                // toggleFavourites,
                // clearfilms,

            }
            }>
            {children}
        </VideoContext.Provider>
    )
}

export const useVideoContext = () => {
    return useContext(VideoContext);
};
