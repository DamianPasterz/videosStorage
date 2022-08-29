import React from 'react';
import { FaHeart } from 'react-icons/fa';
import styled from 'styled-components';

import { useVideoContext } from '../context/VideoContext';
import config from '../tools/config';
import { FlexContanier } from './style/FlexContanier.style';

const NavbarComponent = () => {
    const { setStatus, status} = useVideoContext();

    const handleAll = () => {
        setStatus(config.status.ALL)
    }

    const handleStatus = () => {
        setStatus(config.status.FAVOURITE)
    }

    return (
        <NawbarBody>
            <NawbarBtn onClick={handleAll}><p>ALL VIDEOS</p></NawbarBtn>
            <NawbarBtn onClick={handleStatus} status={status}>
                <p>FAVOURITE</p> <FaHeart size='1rem' color='red' id='heart' />
            </NawbarBtn>
        </NawbarBody>
    );
}

export default NavbarComponent;


const NawbarBody = styled.div`
    display: flex;
    height: 40px;
    width: 1070px;
    background-color: var(--Green1);
    margin-top: 20px;
    padding: 5px;
    justify-content: right;
    border-radius: 15px;
    border: 1px solid var(--Green2);
    box-shadow: 5px 5px 10px black;
    font-size:  1em;

`

const NawbarBtn = styled(FlexContanier)`

    padding-right: 10px;
    padding-left: 10px;
    margin-right: 15px;
    cursor: pointer;
    border-radius: 10px;
    border: 1px solid var(--Green1);
    background-color: ${({status})=> status === config.status.FAVOURITE
    ? 'var(--Green3)'
    : 'var(--Green1)'};
         &:hover {
    border-radius: 10px;
    border: 1px solid var(--Green2);
    color: var(--White);
  }
  &>p{
    padding-top: 5px;
    padding-bottom: 3px;
    margin: 0;
    margin-right: 5px;
  }
  
  
`