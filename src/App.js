import InputComponent from './components/InputComponent';
import VideoPage from "./components/VideoPage"
import NavbarComponent from './components/Navbar';
import FilterNav from './components/FilterNav';
import BootstrapModal from './tools/bootstrapModal'
import { useVideoContext } from './context/VideoContext';

function App() {
  const {alert,idLocalStorage}=useVideoContext();
  return (
    <div>
      <NavbarComponent />
      <h4>Add link or ID</h4>
      <InputComponent />
      <FilterNav />
      <VideoPage />
      <BootstrapModal alert = {alert} id={idLocalStorage}/>
    </div>
  );
}

export default App;
