import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import EditSong from './pages/EditSong';
import AddSong from './pages/AddSong';
import Main from './pages/Main';
import Login from './pages/Login';
import Register from './pages/Register';
import Error from './pages/Error';
import Profile from './pages/Profile';
import CreateAlbum from './pages/CreateAlbum';
import EditAlbum from './pages/EditAlbum';
import SpecAlbum from './pages/SpecAlbum';
import AllAlbum from './pages/AllAlbum';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Main />} />
          <Route path='/createAlbum' element={<CreateAlbum />} />
          <Route path='/editAlbum/:albumId' element={<EditAlbum />} />
          <Route path='/specAlbum/:albumId' element={<SpecAlbum />} />
          <Route path='/allSongs' element={<AllAlbum />} />
          <Route path='/addSong/:albumId' element={<AddSong />} />
          <Route path='/editSong/:songId' element={<EditSong />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
