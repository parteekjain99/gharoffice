import { Routes, Route } from "react-router-dom";
import './App.css';
import Navigation from './components/nav-bar/nav-bar'
import Home from './routes/home/home'
import MovieDetail from './routes/movie-detail/movie-detail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="movie/*" element={<MovieDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
