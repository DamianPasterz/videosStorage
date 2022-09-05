import React, { createContext, MouseEventHandler, useContext, useEffect, useState } from 'react'
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useLocalStorage from '../tools/useLocalStorageHook';
import demo from '../tools/demo'
import config from '../tools/config'

export interface ContextTyp {
    filterFromZToA:()=> void
    filterFromAToZ:()=> void
    filterFromNewToOld:()=> void
    filterFromOldToNew:()=> void
    videos:Video[]
    setStatus: CallableFunction
    handleDemo: MouseEventHandler
    setView: CallableFunction,
    handleClearAll: MouseEventHandler,
    setVideos: CallableFunction,
    setCurrentMovie: CallableFunction
    handleClear: CallableFunction,
    handleShow: CallableFunction,
    status: string,
    filterVideos: Video[],
    view: string,
    loading: boolean,
    demoLoad: boolean,
    alert: string,
    show: boolean,
    currentMovie:string,
    idLocalStorage: string,
    getYtObject: CallableFunction,
    getVimeoObject: CallableFunction,
    setLoading: CallableFunction,
    currentVideos: string,
    handleClose: ()=> void,
    handleCloseAprroved: ()=> void,
    handleCloseAprrovedSingle: (id:string)=> void,
    id: string,
  
   
  
}

type VideoProviderType = {
    children: React.ReactNode
}

export interface Video {
    id: string,
    items:string[],
    aUrl: string,
    additionDate: string,
    favourite: boolean,
    idLocalStorage: string,
    imageUrl: string,
    likeCount: string,
    provider: string,
    title: any,
    viewCount: string,
    movieUrl: string,   
}

export const VideoContext = createContext<ContextTyp>(null!);
export const VideoProvider = ({ children }: VideoProviderType)=> {
    const [videos, setVideos] = useLocalStorage("videos", []);
    const [status, setStatus] = useState<string>(config.status.ALL);
    const [filterVideos, setFilterVideos] = useState<Video[]>(videos);
    const [view, setView] = useState<string>("grid")
    const [loading, setLoading] = useState<boolean>(true)
    const [demoLoad, setdemoLoad] = useState<boolean>(true);
    const [alert, setAlert] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [show, setShow] = useState<boolean>(false);
    const [currentMovie, setCurrentMovie] = useState<string>('')

  const handleClose = () => {
    setShow(false);

};
  const handleCloseAprroved = () => {
    setShow(false)
    successDeleteNotify()
    setVideos([])
    setdemoLoad(true);
};

    const handleShow = () => setShow(true);

    let sortVideos:Video[] = [...filterVideos]

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

    function handleClear(idLocalStorage:string) {
        setAlert(config.message.alertSingleDelete)
        setId(idLocalStorage)
        handleShow()

        return idLocalStorage;
    }

    function handleDelete(idLocalStorage: string):void {
        let deletedVideos: Video = videos.filter(( element: { idLocalStorage: string; } ) => {
            return element.idLocalStorage !== idLocalStorage
        })
        setVideos(deletedVideos)
      }

      const handleCloseAprrovedSingle = (idLocalStorage:string) => {
        setShow(false)
        successDeleteNotify()
        handleDelete(idLocalStorage)
      
    };

    const successNotify = () => toast.success('Video added to the database!');
    const successDeleteNotify = () => toast.success('Video has been removed from the database!');
    const warniNgnotyfi = () => toast('VIdeo already exists in the database!');
    const errorNotify = () => toast.error('video does not exist!');

    useEffect(() => {
        switch (status) {
            case config.status.FAVOURITE:
                setFilterVideos(videos.filter((video: { favourite: boolean; })=> video.favourite === true));
                break;
            default:
                setFilterVideos(videos);
                break;
        }

    }, [videos, status]);
    
    function filterFromAToZ():void {
        sortVideos = sortVideos.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : (b.title.toLowerCase() > a.title.toLowerCase()) ? -1 : 0)
        setFilterVideos(sortVideos)
    }

    function filterFromZToA():void {
        sortVideos = sortVideos.sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase()) ? 1 : (b.title.toLowerCase() < a.title.toLowerCase()) ? -1 : 0)
        setFilterVideos(sortVideos)
    }

    function filterFromNewToOld():void {
        sortVideos = sortVideos.sort((a, b) => (a.additionDate > b.additionDate) ? 1 : (b.additionDate > a.additionDate) ? -1 : 0)
        setFilterVideos(sortVideos)
    }

    
    function filterFromOldToNew():void {
        sortVideos = sortVideos.sort((a, b) => (a.additionDate < b.additionDate) ? 1 : (b.additionDate < a.additionDate) ? -1 : 0)
        setFilterVideos(sortVideos)
    }

    async function getYtObject(newId: string):Promise<void> {
        const api_key = process.env.REACT_APP_KEY_YOUTUBE_API
        const fetchUrl = `${config.url.YouTubFetchUrl}${newId}&key=${api_key}${config.url.YouTubeSnipetPartUrl}`
        const movieUrl = `${config.url.YouTubeMovieUrl}${newId}`;
        const response = await fetch(fetchUrl);
       
        
        if (response.status === 404) {
            errorNotify();
            return;
        }

        const data = await response.json()
        if (!data.items.length ) {
            errorNotify();
            return;
        }

        setLoading(false)
        destructurizeYoutubeObject(data, movieUrl)
    }
    const destructurizeYoutubeObject = (data: { items: { id: string; snippet: { title: string; thumbnails: { default: { url: string; }; }; }; statistics: { viewCount: string; likeCount: string; }; }[]; }, movieUrl: string) => {
        const {
            id,
            snippet: {title , thumbnails: { default: { url, } } },
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
        if (videos.find((item: { id: string; }) => item.id === newItem.id)) {
            setLoading(false) ;
            warniNgnotyfi();
           
            return
        }
        successNotify()
        setVideos([...videos, newItem]);
    };

    async function getVimeoObject(newId:string) {
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
    const destructurizeVimeoObject = (data: { title: string; thumbnail_url: string; video_id: string; }, movieUrl: string) => {
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
        if (videos.find((item: { id: string; }) => item.id === newItem.id)) {
            warniNgnotyfi();
            setLoading(false)
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
                setCurrentMovie,
                status,
                setLoading,
                loading,
            
               
            }
            }>
            {children}
        </VideoContext.Provider>
    )
}

export const useVideoContext = () => {
    return useContext(VideoContext);
};
