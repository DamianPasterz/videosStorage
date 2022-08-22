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
    const [provider, setProvider] = useState('');
    const [videoId, setVideoId] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const { getYtObject, getVimeoObject } = useVideoContext();

    useEffect(() => {
        setLoading(false)
    }, [inputSearch]);

    function handleSubmit(event) {
        event.preventDefault();
        const newProvider = getVideoId(inputSearch)?.service?.toUpperCase();
        const newId = getVideoId(inputSearch)?.id;
        setProvider(newProvider);
        setVideoId(newId);
        setInputSearch('');
        urlOrIdValidation(newProvider, newId, inputSearch)
        setIsDisabled(true);
        setLoading(!loading);
    }

    const vimeoIDLength = 9;
    const vimeoURLLength = 12;
    const youtubeIDLength = 11;
    const minYoutubeURLLength = 13;
    const incorrectInputNotify = () => toast.warning(config.message.toastInputIncorect);
   
    function urlOrIdValidation(newProvider, newId, inputSearch) {
        
        if (inputSearch?.length === vimeoIDLength && inputSearch.split('').every(Number)) {
            newId = inputSearch;
            newProvider = config.provider.VIMEO;
            setProvider(newProvider);
            setVideoId(newId);
            return getVimeoObject(newId);
        }
        
        if (inputSearch?.length > vimeoURLLength && newProvider === config.provider.VIMEO && newId?.length === vimeoIDLength) {
            newProvider = config.provider.VIMEO;
            setProvider(newProvider);
            setVideoId(newId);
            return getVimeoObject(newId);
        }
        
        if (inputSearch?.length === youtubeIDLength && !inputSearch.toUpperCase().includes(config.YOUTUBE)) {
            newId = inputSearch;
            newProvider = config.provider.YOUTUBE;
            setProvider(newProvider);
            setVideoId(newId);
            return getYtObject(newId);
        }
        
        if (inputSearch?.length > minYoutubeURLLength && newProvider === config.provider.YOUTUBE && newId?.length === youtubeIDLength) {
            newProvider = config.provider.YOUTUBE;
            setProvider(newProvider);
            setVideoId(newId);
            return getYtObject(newId);
        }
        else {
            incorrectInputNotify()
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
                        if (e.target.value.length > 8) {
                            setIsDisabled(false)
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

