import React, { useEffect, useState } from 'react'
import { useVideoContext } from "../context/Video_context"
import "../index.css"
import getVideoId from 'get-video-id';




function InputComponent() {
    const [inputSearch, setInputSearch] = useState('')
    const [provider, setProvider] = useState(``)
    const [videoId, setVideoId] = useState("")
    const [isDisabled, setIsDisabled] = useState(true);
    const [loading, setLoading] = useState(false)
    const { getYtObject, getVimeoObject, videos } = useVideoContext();

    function handleSubmit(e) {
        e.preventDefault();
        const newProvider = getVideoId(inputSearch)?.service?.toUpperCase()
        const newId = getVideoId(inputSearch)?.id
        setProvider(newProvider)
        setVideoId(newId)
        setInputSearch("")
        urlOrIdValidation(newProvider, newId, inputSearch)
        setIsDisabled(true);
        setLoading(true)
    }

    function urlOrIdValidation(newProvider, newId, inputSearch) {
        //ID VIMEO
        if (inputSearch.length === 9 && inputSearch.split("").every(Number)) {
            newId = inputSearch
            newProvider = "VIMEO"
            setProvider(newProvider)
            setVideoId(newId)
            return getVimeoObject(newId)
        }
        //URL VIMEO
        if (inputSearch.length > 12 && newProvider === "VIMEO" && newId.length === 9) {
            newProvider = "VIMEO"
            setProvider(newProvider)
            setVideoId(newId)
            return getVimeoObject(newId)
        }
        //ID YOUTUBE
        if (inputSearch.length === 11 && !inputSearch.toUpperCase().includes("YOUTUBE")) {
            newId = inputSearch
            newProvider = "YOUTUBE"
            setProvider(newProvider)
            setVideoId(newId)
            return getYtObject(newId)
        }
        //URL YOUTUBE
        if (inputSearch.length > 13 && newProvider === "YOUTUBE" && newId?.length === 11) {
            newProvider = "YOUTUBE"
            setProvider(newProvider)
            setVideoId(newId)
            return getYtObject(newId)
        }
        else {
            setProvider(`Invalid data entered
            There are no movies like that`)
            return
        }

    }

    useEffect(() => {
        setLoading()
    }, [videos])

    const handleLoading = () => {
        if (loading) {
            return <h2>loading...</h2>
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
                <button className="btn" disabled={isDisabled} onClick={handleLoading} >
                    Add
                </button>
                <div >
                    {loading ? (<p>loadning..s.</p>) : ""
                    }


                </div>

            </form>

        </div>
    )
}
export default InputComponent
