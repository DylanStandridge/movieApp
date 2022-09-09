import { MovieList } from './features/movieList/MovieList';
import './App.css';
import PersistentDrawerLeft from './app/components/Header';
import NoPage from './features/noPage/NoPage';
import {
  Routes,
  Route
} from "react-router-dom";
import { Movie } from './features/movie/Movie';

function App() {
  return (
    <div className="App">
      <Routes>
            <Route path="/" element={<PersistentDrawerLeft/>}>
              <Route index element={<MovieList  />}/>
              <Route path="/favorites" element={<MovieList  />}/>
              <Route path="/movies/:id" element={<Movie />}/>
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
    </div>
  );
}

export default App;
