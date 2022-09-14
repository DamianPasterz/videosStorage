import React from 'react'
import ReactPlayer from 'react-player'
import { useVideoContext } from '../context/VideoContext';
import { Contanier } from './style/FlexContanier.style';

const TabVideo = ():JSX.Element => {
  const { currentMovie } = useVideoContext();
    console.log(currentMovie);
    

  return (
    <Contanier>
     <ReactPlayer
        url={currentMovie}
        controls
        className='media-player'
        height={864}
        width={1152}
      />
    </Contanier>
  )
}

export default TabVideo
