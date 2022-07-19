import { logDOM } from '@testing-library/react';
import React, { useContext } from 'react'
import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from '../tools/useLokalStorageHook';
import moment from 'moment';








export const VideoContext = React.createContext();
export const VideoProvider = ({ children }) => {
    const [videos, setVideos] = useLocalStorage("videos", [])


    const videoLS = videos
    console.log(videos);

    async function getYtObject(newProvider, newId, inputSearch) {




        const fetchUrl = `https://www.googleapis.com/youtube/v3/videos?id=${newId}&key=${"AIzaSyAdhgdhqdLwgz6ow0-jVb-08MJbsUDgPlo"}
        &part=snippet,statistics&fields=items(id,snippet(title,thumbnails(default(url))),statistics(viewCount,likeCount))`

        // const movieUrl = `https://www.youtube.com/watch?v=${newId}`;

        const response = await fetch(fetchUrl);

        const data = await response.json()

        console.log(data);
        destructurizeYoutubeObject(data)



        return

    }

    //destrukturyzacja YT

    const destructurizeYoutubeObject = (data) => {
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
            imageUrl: url,
            additionDate: moment().add(3, 'days').calendar(),
            favourite: false,
        }
        console.log(url);
        console.log(moment().startOf('hour').fromNow());
        if (videos.find(item => item.id === newItem.id)) {
            return

        }
        setVideos([...videos, newItem])

        return
    };


    async function getVimeoObject(newProvider, newId, inputSearch) {


        const fetchUrl = `https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/${newId}`

        // const movieUrl = `https://www.vimeo.com/${videoId}`;

        const response = await fetch(fetchUrl);

        const data = await response.json()
        console.log(data);
        destructurizeVimeoObject(data)

        return
    }


    const destructurizeVimeoObject = (data,) => {
        const {

            title,
            thumbnail_url,
            video_id,

        } = data;
        console.log(data);

        // return { title, id, upload_date }

        const newItem = {
            id: video_id,
            idLocalStorage: uuidv4(),
            title,
            imageUrl: thumbnail_url,
            provider: "VIMEO",
            additionDate: moment().add(3, 'days').calendar(),
            favourite: false,
        };
        if (videos.find(item => item.id !== newItem.id)) {
            console.log("dupaaaaaaaa");


        }
        setVideos([...videos, newItem])
        console.log(moment().startOf('hour').fromNow());
        return

    };






    return (
        <VideoContext.Provider
            value={{
                videos,
                getYtObject,
                getVimeoObject,
                destructurizeYoutubeObject,
                useLocalStorage,
                videoLS,
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
