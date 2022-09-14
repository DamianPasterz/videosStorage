import React from 'react'
import styled from 'styled-components'
// import FilterNav from '../FilterNav'
// import InputComponent from '../InputComponent'
// import NavbarComponent from '../Navbar'
import { GlobalStyles } from '../style/GlobalStyle.style'
import TabVideo from '../TabVideo'
import VideoBar from '../VideoBar'


const PlayerPage = () => {
  return (
   <Contanier>
        <GlobalStyles/>
        {/* <NavbarComponent />
        <InputComponent />
        <FilterNav /> */}
        <TabVideo />
        <VideoBar />
   </Contanier>
  )
}

export default PlayerPage


const Contanier = styled.div`
padding: 0;
margin: 0;
display: flex;
align-items: center;
height: 100vh;
width: 100vw;
flex-direction: column;
 background-color: var(--Dark);
`

