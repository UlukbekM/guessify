import './App.css';
import {Home} from './Components/Home'
import {Item1} from './Components/Item1'
import {Item2} from './Components/Item2'
import {Item3} from './Components/Item3'
import { CategoryPage } from './Components/CategoryPage';
import { PlaylistPage } from './Components/PlaylistPage';
import { Artist } from './Components/Artist';
import { Testing } from './Components/Testing';
import { SearchPage } from './Components/SearchPage';
import { AlbumPage } from './Components/AlbumPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./Components/Header";


function App() {
  return (<>
    <BrowserRouter>
    
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="item1" element={<Item1 />} />
        <Route path="item2" element={<Item2 />} />
        <Route path="item3" element={<Item3 />} />
        <Route path="playlist" element={<PlaylistPage />} />
        <Route path="categories" element={<CategoryPage />} />
        <Route path="artist" element={<Artist />} />
        <Route path="testing" element={<Testing />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="album" element={<AlbumPage />} />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
