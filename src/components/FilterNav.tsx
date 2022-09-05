import React from 'react';
import { FaListAlt } from 'react-icons/fa'
import { BsFillGridFill } from 'react-icons/bs'
import styled from 'styled-components';

import { useVideoContext } from '../context/VideoContext';
import SortButton  from './style/SortButton.style'
import { FlexContanier } from './style/FlexContanier.style';

const FilterNav = () => {
    const { handleClearAll, setView, view, handleDemo } = useVideoContext();

    return (
        <FilterBody>
            <FilterAction>
                <NawbarBtn onClick={handleDemo}>DEMO</NawbarBtn>
                <NawbarBtn onClick={handleClearAll}>CLEAR ALL</NawbarBtn>
            </FilterAction>
            <FilterView>
            <SortButton />
            <ButonWiew>
                <FaListAlt size='1.5rem' color={view === 'list' ? 'black' : 'var(--Green3)'} onClick={() => {setView('list')}} />
                </ButonWiew>
                <ButonWiew>
                <BsFillGridFill size='1.5rem' color={view === 'grid' ? 'black' : 'var(--Green3)'} onClick={() => {setView('grid')}} />
                </ButonWiew>
            </FilterView>
        </FilterBody>
    );
}

export default FilterNav;

const FilterView = styled(FlexContanier)`
    flex: 0.4;
    padding-right: 30px;
`

const FilterBody = styled(FlexContanier)`
    padding-left: 15px;
    padding-right: 15px;
    background-color: var(--Green1);
    width: 1070px;
    height: 40px;
    font-size:  1em;
    border-radius: 15px;
    border: 1px solid  var(--Green2);
    box-shadow: 5px 5px 10px black;
`

const FilterAction = styled(FlexContanier)`
`
const NawbarBtn = styled.button`
    width: 120px;
    height: 30px;
    cursor: pointer;
    border: none;
    border-radius:10px;
    font-weight: bold;
    background: var(--Green1);
        &:hover {
            border-radius: 10px;
            color:  var(--White);
        }`

const ButonWiew = styled.div`
 cursor: pointer;
    &:hover :nth-child(1){
            color:  var(--White);
    }`