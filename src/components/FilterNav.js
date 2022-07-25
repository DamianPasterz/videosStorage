import React, { useState } from 'react';
import { useVideoContext } from '../context/Video_context';
import "../index.css"
import { FaListAlt } from "react-icons/fa"
import { BsFillGridFill } from "react-icons/bs"

const FilterNav = () => {
    const { filterAz, filterZa, filterUploadDateNew, filterUploadDateOld } = useVideoContext();
    const { setVideos, setView, view, HandleDemo } = useVideoContext();

    function HandleClearAll() {
        setVideos([])
    }


    const HandleChange = (e) => {
        switch (e.target.value) {
            case 'filterZa':
                filterZa()
                break;
            case 'filterAz':
                filterAz()
                break;
            case 'filterUploadDateNew':
                filterUploadDateNew()
                break;
            case 'filterUploadDateOld':
                filterUploadDateOld()
                break;
            default:
                break;
        }


    }

    return (

        <div className='filterNav__body'>
            <div className='filterNav__action'>
                <div className='nawbar__btn' onClick={HandleDemo} >
                    DEMO
                </div>
                <div className='nawbar__btn' onClick={HandleClearAll} >
                    CLEAR ALL
                </div>



            </div>
            <div className='filter__view__left'>
                <div className='filterNav__view'>
                    <select className='nawbar__select' onChange={HandleChange}>
                        <option defaultValue="kokosowy" > SORT</option>
                        <option value="filterAz">A-Z</option>
                        <option value="filterZa" >Z-A</option>
                        <option value="filterUploadDateNew"> LATEST</option>
                        <option value="filterUploadDateOld">OLDEST</option>
                    </select>
                </div>
            </div>
            <div className='filterNav__view'>
                <FaListAlt className='nawbar__view__btn' size='1.5rem' color={view === 'list' ? 'red' : 'black'} onClick={() => { setView('list') }} />
                <BsFillGridFill className='nawbar__view__btn' size='1.5rem' color={view === 'grid' ? 'red' : 'black'} onClick={() => { setView('grid') }} />
            </div>
        </div>

    );
}

export default FilterNav;