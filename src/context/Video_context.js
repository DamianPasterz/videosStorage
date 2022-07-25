import React, { useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from '../tools/useLokalStorageHook';
import moment from 'moment';
import demo from '../tools/demo'





export const VideoContext = React.createContext();
export const VideoProvider = ({ children }) => {
    const [videos, setVideos] = useLocalStorage("videos", []);
    const [status, setStatus] = useState('all');
    const [filterVideos, setFilterVideos] = useState([]);
    const [view, setView] = useState("grid")
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    let sortVideos = [...filterVideos]

    function HandleDemo() {
        setVideos(demo)
    }

    useEffect(() => {
        switch (status) {
            case 'favourite':
                setFilterVideos(videos.filter(video => video.favourite === true));
                break;
            default:
                setFilterVideos(videos);
                break;
        }

    }, [videos, status]);
    // filter AZ
    function filterAz() {
        sortVideos = sortVideos.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : (b.title.toLowerCase() > a.title.toLowerCase()) ? -1 : 0)
        setFilterVideos(sortVideos)
    }
    // filter ZA
    function filterZa() {
        sortVideos = sortVideos.sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase()) ? 1 : (b.title.toLowerCase() < a.title.toLowerCase()) ? -1 : 0)
        setFilterVideos(sortVideos)
    }


    // filter Upload date new
    function filterUploadDateNew() {
        sortVideos = sortVideos.sort((a, b) => (a.additionDate > b.additionDate) ? 1 : (b.additionDate > a.additionDate) ? -1 : 0)
        setFilterVideos(sortVideos)
    }

    // filter Upload date old
    function filterUploadDateOld() {
        sortVideos = sortVideos.sort((a, b) => (a.additionDate < b.additionDate) ? 1 : (b.additionDate < a.additionDate) ? -1 : 0)
        setFilterVideos(sortVideos)
    }

    async function getYtObject(newProvider, newId, inputSearch) {
        const api_key = process.env.REACT_APP_KEY_YOUTUBE_API
        const fetchUrl = `https://www.googleapis.com/youtube/v3/videos?id=${newId}&key=${api_key}
        &part=snippet,statistics&fields=items(id,snippet(title,thumbnails(default(url))),statistics(viewCount,likeCount))`
        const movieUrl = `https://www.youtube.com/watch?v=${newId}`;
        const response = await fetch(fetchUrl);
        const data = await response.json()
        setLoading(false)
        destructurizeYoutubeObject(data, movieUrl)
    }
    //destrukturyzacja YT
    const destructurizeYoutubeObject = (data, movieUrl) => {
        const {
            id,
            snippet: { title },
            snippet: { thumbnails: { default: { url, } } },
            statistics: { viewCount, likeCount },
        } = data.items[0];

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
    };


    async function getVimeoObject(newProvider, newId, inputSearch) {
        const fetchUrl = `https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/${newId}`
        const movieUrl = `https://www.vimeo.com/${newId}`;
        const response = await fetch(fetchUrl);
        const data = await response.json()

        destructurizeVimeoObject(data, movieUrl)

    }
    const destructurizeVimeoObject = (data, movieUrl) => {
        const {
            title,
            thumbnail_url,
            video_id,
        } = data;

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
        if (videos.find(item => item.id === newItem.id)) {
            alert("video exist")
            console.log("istnieje");

            return
        }
        setVideos([...videos, newItem])
        setLoading(false)
    };

    function deleteVideo(videos, idLocalStorage) {
        let deletedVideos = videos.filter((element) => {
            return element.idLocalStorage !== idLocalStorage
        })
        setVideos([deletedVideos])
    }


    return (
        <VideoContext.Provider
            value={{
                ...videos,
                getYtObject,
                getVimeoObject,
                destructurizeYoutubeObject,
                setVideos,
                videos,
                deleteVideo,
                filterAz,
                filterZa,
                filterUploadDateNew,
                filterUploadDateOld,
                setStatus,
                filterVideos,
                view,
                setView,
                isOpen,
                setIsOpen,
                HandleDemo,




            }
            }>
            {children}
        </VideoContext.Provider>
    )
}

export const useVideoContext = () => {
    return useContext(VideoContext);
};
