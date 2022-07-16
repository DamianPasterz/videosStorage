import React, { useEffect, useState } from 'react'
import { useVideoContext } from "../context/Video_context"
import getVideoId from 'get-video-id';

import {
    Spinner,
} from 'reactstrap';


function InputComponent() {
    const [inputSearch, setInputSearch] = useState('')
    const [provider, setProvider] = useState('')
    const [videoId, setVideoId] = useState("")
    const [isDisabled, setIsDisabled] = useState(false);
    const { addItem, isLoading } = useVideoContext();



    const checkLink = () => {
        if (!inputSearch.length) {
            return;
        }
        const { service } = getVideoId(inputSearch);

        return service.toUpperCase();
    }
    const checkId = () => {

        const { id } = getVideoId(inputSearch)
        return id;
    }



    function handleSubmit(e) {
        e.preventDefault();
        setProvider(checkLink())
        setVideoId(checkId())
        setInputSearch("")
        addItem(provider, videoId, inputSearch)
        setIsDisabled(true);
    }

    const spinnerOrButton = isLoading => {
        return isLoading ? (
            <Spinner color='primary' className='align-self-center' >loading...</Spinner>
        ) : (
            <button disabled={isDisabled}>
                Add
            </button>
        );
    };




    console.log(provider);


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


                    }} />
                {spinnerOrButton(isLoading)}

            </form>
        </div>
    )
}

export default InputComponent
