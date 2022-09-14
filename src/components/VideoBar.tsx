import React from 'react';
import styled from 'styled-components';
import { FlexContanier } from './style/FlexContanier.style';
import { Link } from 'react-router-dom';

const FilterNav = ():JSX.Element => {

    return (
        <FilterBody>
             <Link to={`/videosStorage/`} >
                <NawbarBtn>BACK</NawbarBtn>
                </Link>
        </FilterBody>
    );
}

export default FilterNav;


const FilterBody = styled(FlexContanier)`
    padding-left: 12px;
    padding-right: 15px;
    margin-top: 10px;
    margin-bottom: 20px;
    background-color: var(--Green1);
    width: 100px;
    height: 40px;
    font-size:  1em;
    border-radius: 10px;
    border: 1px solid  var(--Green2);
    box-shadow: 5px 5px 10px black;
`

const NawbarBtn = styled.button`
    width: 80px;
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

