import React, { useState } from 'react';
import { FaListAlt } from "react-icons/fa"
import { BsFillGridFill } from "react-icons/bs"

import { useVideoContext } from '../context/VideoContext';
import "../index.css"
import config from '../tools/config';

const FilterNav = () => {
    const { filterFromZToA, filterFromAToZ, filterFromNewToOld, filterFromOldToNew } = useVideoContext();
    const { setVideos, setView, view, HandleDemo } = useVideoContext();

    function HandleClearAll() {
        setVideos([])
    }

    const handleChange = (event) => {
        switch (event.target.value) {
            case config.filterFromZToA:
                filterFromZToA()
                break;
            case config.filterFromAToZ:
                filterFromAToZ()
                break;
            case config.filterFromNewToOld:
                filterFromNewToOld()
                break;
            case config.filterFromOldToNew:
                filterFromOldToNew()
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
                    <select className='nawbar__select' onChange={handleChange}>
                        <option defaultValue="" >SORT</option>
                        <option value = {config.filterFromAToZ} >A-Z</option>
                        <option value={config.filterFromZToA}>Z-A</option>
                        <option value={config.filterFromNewToOld}>LATEST</option>
                        <option value={config.filterFromOldToNew}>OLDEST</option>
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