import React, { useEffect, useState } from 'react'
import getVideoId from 'get-video-id';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useVideoContext } from "../context/VideoContext"
import "../index.css"
import config from '../tools/config'

function InputComponent() {
    const [inputSearch, setInputSearch] = useState('');
    let [provider, setProvider] = useState('');
    let [videoId, setVideoId] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const { getYtObject, getVimeoObject } = useVideoContext();

    useEffect(() => {
        setLoading(false)
    }, [inputSearch]);

    function handleSubmit(event) {
        event.preventDefault();
        provider = getVideoId(inputSearch)?.service?.toUpperCase();
        videoId = getVideoId(inputSearch)?.id;
        setProvider(provider);
        setVideoId(videoId);
        setInputSearch('');
        urlOrIdValidation(provider, videoId, inputSearch)
        setIsDisabled(isDisabled);
        setLoading(true);
    }

    const vimeoIDLength = 9;
    const vimeoURLLength = 12;
    const youtubeIDLength = 11;
    const minYoutubeURLLength = 13;
    const minInput = 8;
    const incorrectInputNotify = () => toast.warning(config.message.toastInputIncorect);
   
    function urlOrIdValidation(provider, videoId, inputSearch) {
        
        if (inputSearch?.length === vimeoIDLength && inputSearch.split('').every(Number)) {
            videoId = inputSearch;
            provider = config.provider.VIMEO;
            setProvider(provider);
            setVideoId(videoId);
            return getVimeoObject(videoId);
        }
        
        if (inputSearch?.length > vimeoURLLength && provider === config.provider.VIMEO && videoId?.length === vimeoIDLength) {
            provider = config.provider.VIMEO;
            setProvider(provider);
            setVideoId(videoId);
            return getVimeoObject(videoId);
        }
        
        if (inputSearch?.length === youtubeIDLength && !inputSearch.toUpperCase().includes(config.provider.YOUTUBE)) {
            videoId = inputSearch;
            provider = config.provider.YOUTUBE;
            setProvider(provider);
            setVideoId(videoId);
            return getYtObject(videoId);
        }
        
        if (inputSearch?.length > minYoutubeURLLength && provider === config.provider.YOUTUBE && videoId?.length === youtubeIDLength) {
            provider = config.provider.YOUTUBE;
            setProvider(provider);
            setVideoId(videoId);
            return getYtObject(videoId);
        }
        else {
            incorrectInputNotify()
            setInputSearch('')
            return;
        }
    }
   
    return (
        <div className='input__contanier'>
            <form onSubmit={handleSubmit}>
                <input className="input__input"
                    type='text'
                    name='url'
                    id='url'
                    placeholder="Your movie's URL/ID"
                    value={inputSearch}
                    onChange={e => {
                        setInputSearch(e.target.value)
                        if (e.target.value.length >= minInput) {
                            setIsDisabled(false)
                        }
                        if (e.target.value.length < minInput) {
                            setIsDisabled(true)
                        }
                    }} />
                <button className="btn" disabled={isDisabled}>Add</button>
                <div className='loading-field' >
                    {loading
                    ? (<div class="spinner-border" role="status">
                       <span class="visually-hidden"></span>
                       </div>) 
                    : " "}
                </div>
            </form>
            <ToastContainer position="top-center" />
        </div>
    )
}

export default InputComponent

