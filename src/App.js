import InputComponent from './components/InputComponent';
import VideoPage from "./components/VideoPage"
import NavbarComponent from './components/Navbar';
import FilterNav from './components/FilterNav';

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <h4>Add link or ID</h4>
      <InputComponent />
      <FilterNav />
      <VideoPage />
    </div>
  );
}

export default App;
