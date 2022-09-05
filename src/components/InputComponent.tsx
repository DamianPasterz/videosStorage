import React, { useEffect, useState, FormEvent } from 'react'
import getVideoId from 'get-video-id';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import Spinner from 'react-bootstrap/Spinner';

import { useVideoContext } from '../context/VideoContext'
import config from '../tools/config'
import { FlexContanier } from './style/FlexContanier.style';

const InputComponent = () => {
    const [inputSearch, setInputSearch] = useState<string>('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [provider, setProvider] = useState<string>(config.provider.YOUTUBE);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [videoId, setVideoId] = useState<string>('');
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const { getYtObject, getVimeoObject, videos, loading, setLoading } = useVideoContext();
    useEffect(() => {
        setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videos,inputSearch]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        const newProvider:string  = getVideoId(inputSearch)?.service?.toUpperCase()!;
        const newId:string  = getVideoId(inputSearch)?.id!;
        setProvider(newProvider);
        setVideoId(newId);
        setInputSearch('');
        urlOrIdValidation(newProvider, newId)
        setIsDisabled(isDisabled);
        setLoading(!loading);
    }

    const vimeoIDLength = 9;
    const vimeoURLLength = 12;
    const youtubeIDLength = 11;
    const minYoutubeURLLength = 13;
    const minInput = 8;
    const incorrectInputNotify:()=>void = () => toast.warning(config.message.toastInputIncorect);
   
    function urlOrIdValidation(newProvider:string, newId:string):void {
        
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
        
        if (inputSearch?.length === youtubeIDLength && !inputSearch.toUpperCase().includes(config.provider.YOUTUBE)) {
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
            setInputSearch('');
            return;
        }
    }
   
    return (
        <InputContanier>
            <Form onSubmit={handleSubmit}>
            <Loader>
                    {loading?( <Spinner animation="border" variant="warning" role="status"><span className="visually-hidden">Loading...</span></Spinner>): ""}
            </Loader>
                <Input 
                    type='text'
                    name='url'
                    id='url'
                    placeholder="Your movie's URL/ID"
                    value={inputSearch}
                    onChange={e => {
                        setInputSearch(e.target.value)
                        if (e.target.value?.length >= minInput) {
                            setIsDisabled(false)
                        }
                        if (e.target.value?.length < minInput) {
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
    &:disabled{
        background-color: var(--Green3);
        color:black;
    }
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
