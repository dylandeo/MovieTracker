// App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LikesPage from './components/LikesPage';
import WatchLaterPage from './components/WatchLaterPage';
import SearchPage from './components/SearchPage';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import AddLikes from './components/AddLikes';

function App() {
    const [movies, setMovies] = useState([]);
    const [likes, setLikes] = useState([]);
    const [watchLater, setWatchLater] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const location = useLocation();

    const getMovieRequest = async (searchValue) => {
        if (searchValue.trim() === '') return;
        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=ac6774f1`;
        const response = await fetch(url);
        const response_json = await response.json();

        if (response_json.Search) {
            setMovies(response_json.Search);
        } else {
            setMovies([]);
        }
    };

    useEffect(() => {
        getMovieRequest(searchValue);
    }, [searchValue]);

    const addToLikes = (movie) => {
        const newLikeslist = [...likes, movie];
        setLikes(newLikeslist);
    };

    const addToWatchLater = (movie) => {
        const newWatchLaterList = [...watchLater, movie];
        setWatchLater(newWatchLaterList);
    };

    return (
        <>
            <NavBar />
            <div className="container-fluid movie-app">
                <div className="row d-flex align-items-center mb-4">
                    {location.pathname === '/' && <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />}
                </div>
                <div className="_container">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <SearchPage
                                    searchValue={searchValue}
                                    setSearchValue={setSearchValue}
                                    movies={movies}
                                    handleLikesClick={addToLikes}
                                    handleWatchLaterClick={addToWatchLater}
                                    currentRoute={location.pathname}
                                />
                            }
                        />
                        <Route path="/likes" element={<LikesPage likes={likes} likeSet={setLikes} />} />
                        <Route path="/watch-later" element={<WatchLaterPage watchLater={watchLater} watchFunction={setWatchLater} currentRoute={location.pathname} />} />
                    </Routes>
                </div>
            </div>
        </>
    );
}

export default App;
