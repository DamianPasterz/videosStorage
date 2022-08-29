import React, { useEffect, useState } from 'react'
import getVideoId from 'get-video-id';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

import { useVideoContext } from '../context/VideoContext'
import config from '../tools/config'
import { FadingDots } from 'react-cssfx-loading';
import { FlexContanier } from './style/FlexContanier.style';

function InputComponent() {
    const [inputSearch, setInputSearch] = useState('');
    let [provider, setProvider] = useState('');
    let [videoId, setVideoId] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const { getYtObject, getVimeoObject, videos, loading, setLoading } = useVideoContext();
    useEffect(() => {
        setLoading(false)
    }, [videos]);

    function handleSubmit(event) {
        event.preventDefault();
        const newProvider = getVideoId(inputSearch)?.service?.toUpperCase();
        const newId = getVideoId(inputSearch)?.id;
        setProvider(newProvider);
        setVideoId(newId);
        setInputSearch('');
        urlOrIdValidation(newProvider, newId, inputSearch)
        setIsDisabled(isDisabled);
        setLoading(!loading);
    }

    const vimeoIDLength = 9;
    const vimeoURLLength = 12;
    const youtubeIDLength = 11;
    const minYoutubeURLLength = 13;
    const minInput = 8;
    const incorrectInputNotify = () => toast.warning(config.message.toastInputIncorect);
   
    function urlOrIdValidation(newProvider, newId) {
        
        if (inputSearch?.length === vimeoIDLength && inputSearch.split('').every(Number)) {
            newId = inputSearch;
            provider = config.provider.VIMEO;
            setProvider(newProvider);
            setVideoId(newId);
            return getVimeoObject(newId);
        }
        
        if (inputSearch?.length > vimeoURLLength && provider === config.provider.VIMEO && newId?.length === vimeoIDLength) {
            provider = config.provider.VIMEO;
            setProvider(newProvider);
            setVideoId(newId);
            return getVimeoObject(newId);
        }
        
        if (inputSearch?.length === youtubeIDLength && !inputSearch.toUpperCase().includes(config.provider.YOUTUBE)) {
            newId = inputSearch;
            provider = config.provider.YOUTUBE;
            setProvider(newProvider);
            setVideoId(newId);
            return getYtObject(newId);
        }
        
        if (inputSearch?.length > minYoutubeURLLength && provider === config.provider.YOUTUBE && newId?.length === youtubeIDLength) {
            provider = config.provider.YOUTUBE;
            setProvider(newProvider);
            setVideoId(newId);
            return getYtObject(newId, loading, setLoading);
        }
        else {
            incorrectInputNotify()
            setInputSearch('');
            return;
        }
    }
   
    return (
        <InputContanier>
           
            <Form onSubmit={handleSubmit}>
            <Loader>
                    {loading?(<FadingDots color={'var(--Green1)'} width="30px" height="30px" duration="1s" />): ""}
            </Loader>
                <Input 
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
                <ButtonAdd disabled={isDisabled}>Add</ButtonAdd>
                
            </Form>
            <ToastContainer position="top-right" autoClose={1000} />
        </InputContanier>
    )
}

export default InputComponent

const InputContanier = styled(FlexContanier)`
margin-top: 30px;
margin-bottom: 30px;  
`

const ButtonAdd = styled.button`
    height: 40px;
    width: 80px;
    border-radius: 10px;
    background-color:var(--Green1);
    border: 1px solid black;
    box-shadow: 5px 5px 10px black;
`

const Input = styled.input`
    height: 40px;
    width: 30rem;
    font-size: 15px;
    align-items: center;
    text-align: center;
    border-radius: 10px;
    border: 1px solid black;
    box-shadow: 5px 5px 10px black;
`
const Loader = styled.div`
padding-right: 15px;
 
`
const Form = styled.form`
display: flex;
align-items: center;
`