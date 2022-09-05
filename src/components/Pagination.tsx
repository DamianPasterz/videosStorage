import React, {useEffect} from 'react'
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "react-bootstrap/Pagination"; 
import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa'
import styled from 'styled-components';

import{ StyleProps } from '../tools/types'
import { useVideoContext, Video } from '../context/VideoContext';

type PaginationTypes = {
  videosPerPage: number,
  paginate: CallableFunction,
  currentPage: number,
  setCurrentPage: CallableFunction,
  posts: Video[],
  filterVideos: Video[],
  videos: Video[],
  totalVideos: any,
  currentMovie: string
}


function PaginationModule({ videosPerPage, paginate, currentPage, setCurrentPage, posts, filterVideos, videos, totalVideos, currentMovie}:PaginationTypes) {

    const { status } =  useVideoContext();
    const pageNumbers = [];
    useEffect(() => {
        if (posts?.length === 0 && currentPage > 1) {
            setCurrentPage(currentPage);
        }
        //eslint-disable-next-line
      }, [filterVideos, status, posts]); 
      
    
    
    for (let number = 1; number <= Math.ceil(filterVideos?.length / videosPerPage); number++) {
        pageNumbers.push( 
          <PaginationItem
            key={number}
            onClick={() => paginate(number)}
            active={currentPage === number}
            disabled={currentPage === number}
          >
            {number}
          </PaginationItem>
        );
      }
      
      return (
        <PaginateContainer>
        
          <Pagination>
              <PaginationArrow onClick={() => paginate(1)} disabled={currentPage === 1}> <FaAngleDoubleLeft/> </PaginationArrow>
              <PaginationArrow onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} ><FaAngleLeft/></PaginationArrow>
               {pageNumbers}
              <PaginationArrow onClick={() => paginate(currentPage + 1)} disabled={currentPage === pageNumbers?.length} ><FaAngleRight/></PaginationArrow>
              <PaginationArrow onClick={() => paginate(pageNumbers?.length)} disabled={currentPage === pageNumbers?.length}><FaAngleDoubleRight/></PaginationArrow>
                
          </Pagination>
        </PaginateContainer>
      );
    }
    
export default PaginationModule

const PaginateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 25px;
  margin-bottom: 15px;
  width: 100vw;
  color: black;
`

const PaginationItem = styled.button<StyleProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color:var(--Green1);
    border: 1px solid black;
    border-radius: 10px;
    cursor: pointer;
    &:disabled{
        cursor:auto;
        background-color: var(--Green2);
        color: black;
      }
    
  
`
const PaginationArrow = styled(PaginationItem)`
   &:disabled{
        cursor:auto;
        background-color: var(--Green3);
        color: black;
      }
`