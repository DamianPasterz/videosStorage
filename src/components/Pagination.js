import React, {useEffect} from 'react'
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "react-bootstrap/Pagination";

function PaginationModule({ videosPerPage, paginate, currentPage, setCurrentPage, posts, filterVideos}) {
    useEffect(() => {
        if (posts?.length === 0 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
      }, [posts]);

    const pageNumbers = [];
    for (let number = 1; number <= Math.ceil(filterVideos?.length / videosPerPage); number++) {
        pageNumbers.push( 
          <Pagination.Item
            key={number}
            onClick={() => paginate(number)}
            active={currentPage === number}
            disabled={currentPage === number}
          >
            {number}
          </Pagination.Item>
        );
      }
      
      return (
        <div className='paginate'>
          {" "}
        <Pagination>
            {currentPage !== 1
              ? <>
                <Pagination.First onClick={() => paginate(1)}/>
                <Pagination.Prev onClick={() => paginate(currentPage-1)} />
                </>
              : ""}
                {pageNumbers}
                {currentPage !== pageNumbers.length
                ? <>
                  <Pagination.Next onClick={() => paginate(currentPage+1)} />
                  <Pagination.Last onClick={() => paginate(filterVideos-1)} />
                </>
                : ""}
        </Pagination>
        </div>
      );
    }
    
export default PaginationModule
