import React, { useState } from 'react'
import { useVideoContext } from "../context/Video_context"

import getVideoId from 'get-video-id';


import {
    Spinner,
} from 'reactstrap';


function InputComponent() {
    const [inputSearch, setInputSearch] = useState('')
    const [provider, setProvider] = useState(`I'm waiting for the movie`)
    const [videoId, setVideoId] = useState("")
    const [isDisabled, setIsDisabled] = useState(true);
    const { getYtObject, getVimeoObject } = useVideoContext();









    function handleSubmit(e) {
        e.preventDefault();

        const newProvider = getVideoId(inputSearch)?.service?.toUpperCase()
        const newId = getVideoId(inputSearch)?.id
        setProvider(newProvider)
        setVideoId(newId)
        setInputSearch("")
        urlOrIdValidation(newProvider, newId, inputSearch)
        setIsDisabled(true);

    }


    function urlOrIdValidation(newProvider, newId, inputSearch) {
        //ID VIMEO
        if (inputSearch.length == 9 && inputSearch.split("").every(Number)) {

            newId = inputSearch
            newProvider = "VIMEO"
            setProvider(newProvider)
            setVideoId(newId)
            console.log(newProvider);
            console.log(newId);
            return getVimeoObject(newProvider, newId, inputSearch)

        }
        //URL VIMEO
        if (inputSearch.length > 12 && newProvider == "VIMEO" && newId.length === 9) {

            newProvider = "VIMEO"
            setProvider(newProvider)
            setVideoId(newId)
            console.log("VImeo URL ");
            return getVimeoObject(newProvider, newId, inputSearch)

        }
        //ID YOUTUBE
        if (inputSearch.length == 11 && !inputSearch.toUpperCase().includes("YOUTUBE")) {

            newId = inputSearch
            newProvider = "YOUTUBE"
            setProvider(newProvider)
            setVideoId(newId)
            return getYtObject(newProvider, newId, inputSearch, setProvider)
        }
        //URL YOUTUBE
        if (inputSearch.length > 13 && newProvider == "YOUTUBE" && newId?.length === 11) {

            newProvider = "YOUTUBE"
            setProvider(newProvider)
            setVideoId(newId)
            console.log(newId);
            console.log("YT url ");
            return getYtObject(newProvider, newId, inputSearch)

        }
        else {
            setProvider(`Invalid data entered
            There are no movies like that`)
            return
        }
    }





    return (
        <div className='input__contanier'>
            <form onSubmit={handleSubmit}>
                <input
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
                <button disabled={isDisabled} >
                    Add
                </button>
                <div>
                    {provider}
                </div>
            </form>
        </div>
    )
}

export default InputComponent
