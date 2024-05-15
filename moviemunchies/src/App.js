import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LikesPage from './components/LikesPage';
import MovieList from './components/MovieList';
import WatchLaterPage from './components/WatchLaterPage';
import SearchPage from './components/SearchPage';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import AddLikes from './components/AddLikes';


function App() {
  const [movies, setMovies] = useState([]);
  const [likes, setLikes] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=ac6774f1`;
    const response = await fetch(url);
    const response_json = await response.json();

    if (response_json.Search) {
      setMovies(response_json.Search);
    }
  }

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  const addToLikes = (movie) => {
    const newLikeslist = [...likes, movie];
    setLikes(newLikeslist);
  }

  return (
    <>
      <NavBar />
      <div className="_container">
        <Routes>
          <Route path="/" element={<SearchPage searchValue={searchValue} setSearchValue={setSearchValue} movies={movies} handleLikesClick={addToLikes} likesComponent={AddLikes} />} />
          <Route path="/likes" element={<LikesPage likes={likes} />} />
          <Route path="/watch-later" element={<WatchLaterPage />} />
        </Routes>
      </div>
      <div className='container-fluid movie-app'>
        <div className="row d-flex align-items-center">
          <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
        </div>
        <div className="row">
          <MovieList movies={movies} handleLikesClick={addToLikes} likesComponent={AddLikes} />
        </div>

        
      </div>
    </>
  );
}

export default App;

