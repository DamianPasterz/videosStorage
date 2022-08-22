import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useLocalStorage from '../tools/useLocalStorageHook';
import demo from '../tools/demo'
import config from '../tools/config'

export const VideoContext = React.createContext();
export const VideoProvider = ({ children }) => {
    const [videos, setVideos] = useLocalStorage("videos", []);
    const [status, setStatus] = useState('all');
    const [filterVideos, setFilterVideos] = useState([]);
    const [view, setView] = useState("grid")
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [demoLoad, setdemoLoad] = useState(true);
    const [alert, setAlert] = useState('');
    const [id, setId] = useState();
    const [show, setShow] = useState(false);
    const [currentMovie, setCurrentMovie] = useState()
// console.log(currentMovie);

  const handleClose = () => {
    setShow(false);
    setAlert()
};
  const handleCloseAprroved = () => {
    setShow(false)
    successDeleteNotify()
    setVideos([])
    setdemoLoad(true);
    setAlert();
};

  const handleShow = () => setShow(true);
    let sortVideos = [...filterVideos]

    function handleDemo() {
            if (demoLoad) {
                toast.success(config.message.toastSuccses)
                setVideos([...videos,...demo]);
                setdemoLoad(false)
            }

            if (!demoLoad) toast.warning(config.message.toastWarning)
    }
    
    function handleClearAll() {
        setAlert(config.message.alertAllDelete)
        handleShow();
        
    }

    function handleClear(idLocalStorage) {
        setAlert(config.message.alertSingleDelete)
        setId(idLocalStorage)
        handleShow()

        return id;
    }

    function handleDelete(id) {
        let deletedVideos = videos.filter((element) => {
            return element.idLocalStorage !== id
        })
        setVideos(deletedVideos)
      }

      const handleCloseAprrovedSingle = (id) => {
        setShow(false)
        successDeleteNotify()
        handleDelete(id)
        setAlert();
    };

    const successNotify = () => toast.success('Video added to the database!');
    const successDeleteNotify = () => toast.success('Video has been removed from the database!');
    const warniNgnotyfi = () => toast('VIdeo already exists in the database!');
    const errorNotify = () => toast.error('video does not exist!');

    useEffect(() => {
        switch (status) {
            case config.status.FAVOURITE:
                setFilterVideos(videos.filter(video => video.favourite === true));
                break;
            default:
                setFilterVideos(videos);
                break;
        }

    }, [videos, status]);
    
    function filterFromAToZ() {
        sortVideos = sortVideos.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : (b.title.toLowerCase() > a.title.toLowerCase()) ? -1 : 0)
        setFilterVideos(sortVideos)
    }

    function filterFromZToA() {
        sortVideos = sortVideos.sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase()) ? 1 : (b.title.toLowerCase() < a.title.toLowerCase()) ? -1 : 0)
        setFilterVideos(sortVideos)
    }

    function filterFromNewToOld() {
        sortVideos = sortVideos.sort((a, b) => (a.additionDate > b.additionDate) ? 1 : (b.additionDate > a.additionDate) ? -1 : 0)
        setFilterVideos(sortVideos)
    }

    
    function filterFromOldToNew() {
        sortVideos = sortVideos.sort((a, b) => (a.additionDate < b.additionDate) ? 1 : (b.additionDate < a.additionDate) ? -1 : 0)
        setFilterVideos(sortVideos)
    }

    async function getYtObject(newId) {
        const api_key = process.env.REACT_APP_KEY_YOUTUBE_API
        const fetchUrl = `${config.url.YouTubFetchUrl}${newId}&key=${api_key}${config.url.YouTubeSnipetPartUrl}`
        const movieUrl = `${config.url.YouTubeMovieUrl}${newId}`;
        const response = await fetch(fetchUrl);
        if (response.status === 404) {
            errorNotify();
            return;
        }

        const data = await response.json()
        if (data.items?.length === 0) {
            errorNotify();
            return;
        }

        setLoading(false)
        destructurizeYoutubeObject(data, movieUrl)
    }
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
            provider: config.provider.YOUTUBE,
            aUrl: movieUrl,
            imageUrl: url,
            additionDate:moment().add(10, 'days').calendar(),
            favourite: false,
        }
        if (videos.find(item => item.id === newItem.id)) {
            warniNgnotyfi();
            setLoading(false);
            return
        }
        successNotify()
        setVideos([...videos, newItem]);
    };

    async function getVimeoObject(newId) {
        const fetchUrl = `${config.url.VimeoFetchUrl}${newId}`
        const movieUrl = `${config.url.VimeoMovieUrl}${newId}`;
        const response = await fetch(fetchUrl)
        if (response.status === 404) {
            errorNotify()
            setLoading(false)
            return
        }
        const data = await response.json()
        destructurizeVimeoObject(data, movieUrl);

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
            provider: config.provider.VIMEO,
            additionDate:moment().add(10, 'days').calendar(),
            aUrl: movieUrl,
            favourite: false,
        };
        if (videos.find(item => item.id === newItem.id)) {
            warniNgnotyfi();
            setLoading(false);
            return;
        }
        setVideos([...videos, newItem])
        successNotify();
    };

    return (
        <VideoContext.Provider
            value={{
                ...videos,
                getYtObject,
                getVimeoObject,
                destructurizeYoutubeObject,
                setVideos,
                videos,
                filterFromAToZ,
                filterFromZToA,
                filterFromNewToOld,
                filterFromOldToNew,
                setStatus,
                filterVideos,
                view,
                setView,
                isOpen,
                setIsOpen,
                handleDemo,
                alert,
                successDeleteNotify,
                handleClearAll,
                show,
                setShow,
                handleShow,
                handleClose,
                handleCloseAprroved,
                setAlert,
                handleCloseAprrovedSingle,
                handleDelete,
                handleClear,
                id,
                currentMovie,
                setCurrentMovie
               
            }
            }>
            {children}
        </VideoContext.Provider>
    )
}

export const useVideoContext = () => {
    return useContext(VideoContext);
};
