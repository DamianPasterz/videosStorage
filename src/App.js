import styled from 'styled-components';

import BootstrapModal from './components/Modal/bootstrapModal'
import FilterNav from './components/FilterNav';
import InputComponent from './components/InputComponent';
import NavbarComponent from './components/Navbar';
import { GlobalStyles } from './components/style/GlobalStyle.style';
import { useVideoContext } from './context/VideoContext';
import VideoPage from './components/VideoPage'

function App() {
  const { alert, idLocalStorage, currentMovie } = useVideoContext();
  return (
    <Contanier>
      <GlobalStyles/>
      <NavbarComponent />
      <InputComponent />
      <FilterNav />
      <VideoPage />
      <BootstrapModal alert={alert} id={idLocalStorage} currentMovie={currentMovie}/>
    </Contanier>
  );
}

export default App;

const Contanier = styled.div`
padding: 0;
margin: 0;
display: flex;
align-items: center;
height: 100vh;
width: 100vw;
flex-direction: column;
`

