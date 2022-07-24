import React from 'react'
import "../index.css"


function Pagination({ videosPerPage, totalVideos, paginate, setVideosPerPage }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalVideos / videosPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <div className='paginate'>
            <ul className='paginate'>
                {pageNumbers.map(number => (
                    <li key={number} className="page_item">
                        <a onClick={() => paginate(number)} href="!#" className='page_link'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default Pagination
