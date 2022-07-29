import './App.css';
import {Home} from './Components/Home'
import {Item1} from './Components/Item1'
import {Item2} from './Components/Item2'
import {Item3} from './Components/Item3'
import { CategoryPage } from './Components/CategoryPage';
import { PlaylistPage } from './Components/PlaylistPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="item1" element={<Item1 />} />
        <Route path="item2" element={<Item2 />} />
        <Route path="item3" element={<Item3 />} />
        <Route path="playlist" element={<PlaylistPage />} />
        <Route path="categories" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
