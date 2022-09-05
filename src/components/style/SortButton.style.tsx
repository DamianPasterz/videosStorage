import React from 'react'
import { useVideoContext } from '../../context/VideoContext';
import styled from 'styled-components'
import{ GrSort } from 'react-icons/gr'
import{ FaSortAlphaUp, FaSortAlphaDownAlt, FaSortNumericUp, FaSortNumericDownAlt } from 'react-icons/fa'

const ButtonBody = styled.button`
 color: black;
 position: relative;
 padding: 10px 64px;
 font-weight: bold;
 font-size: 16px;
 line-height: 1;
 color: black;
 background: none;
 border: none;
 outline: none;
 overflow: hidden;
 cursor: pointer;
 transition: 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
    &:hover::before{
        transform: scale(1.2);
    }
    &:hover span, :hover span span {
        transform: translateY(-55px);
    }
    &:before {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        background: #888C03;
        /* border-radius: 24px; */
        transition: 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
    }  
    & span{
        display: inline-flex;
        vertical-align: middle;
        transition: 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
        transition-delay: 0.05s;
        &:first-child{
            padding-right: 7px;
        }
        & span{
            display: inline-flex;
            vertical-align: middle;
            transition: 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
            margin-left: 8px;
            transition-delay: 0.1s;
        }
    }
    & ul {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        display: flex;
        margin: 0;
        padding: 5px;
        list-style-type: none;
        transform: translateY(-50%);
       
        & li {
            flex: 1;
            & div {
                display: inline-flex;
                vertical-align: middle;
                transform: translateY(55px);
                padding: 5px;
                border: 1px solid #888C03;
                transition: 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
                &:hover{
                    border-radius: 10px;
                    border: 1px solid rgba(242, 234, 118, 1);
                    padding: 5px;
                    color:  #F2F2F2;
                    color:#F2F2F2 ;
                }
            }
        }
    }
    &:hover ul li div {
        transform: translateY(0);
    }
    &:hover ul li:nth-child(1) div {
        transition-delay: 0.1s;
    }
    &:hover ul li:nth-child(2) div {
        transition-delay: 0.1s;
    }
    &:hover ul li:nth-child(3) div {
        transition-delay: 0.1s;
    }
    &:hover ul li:nth-child(4) div {
        transition-delay: 0.1s;
    }
`

const SortButton = () => {
    const { filterFromZToA, filterFromAToZ, filterFromNewToOld, filterFromOldToNew } = useVideoContext();
    const iconSize = '1.5rem'
 
  return (
    <ButtonBody>
      <span>SORT</span>
      <span><GrSort /></span>
        <ul>
            <li>
                <div><FaSortAlphaUp size={iconSize} onClick={()=>filterFromAToZ()}/></div>
            </li>
            <li>
                <div><FaSortAlphaDownAlt size={iconSize} onClick={()=> filterFromZToA()}/></div>
            </li>
            <li>
                <div><FaSortNumericUp size={iconSize} onClick={()=> filterFromNewToOld()}/></div>
            </li>
            <li>
                <div ><FaSortNumericDownAlt size={iconSize} onClick={()=> filterFromOldToNew()}/></div>
            </li>
        </ul>
    </ButtonBody>
  )
}

export default SortButton;
