import React, { useEffect, useState } from 'react';
import MovieList from './MovieList';
import SearchBar from './SearchBar';
import AddLikes from './AddLikes';
import LikesPage from './LikesPage';


const SearchPage = ({}) =>
{
    const [movies, setMovies] = useState([]);
    const [likes, setLikes] = useState([])
    const [searchValue, setSearchValue] = useState('')

      const getMovieRequest= async(searchValue) => {
        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=ac6774f1`
        const response = await fetch(url);
        const response_json= await response.json();

        if(response_json.Search){
            setMovies(response_json.Search);
        }
        
    }

    useEffect(()=>{
        getMovieRequest(searchValue);
    }, [searchValue])

    const addToLikes = (movie) => {
        const newLikeslist= [...likes, movie];
        setLikes(newLikeslist);
    }

    return <div className='container-fluid movie-app'>
    <div className="row d-flex align-items-center">
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue}/>
        </div>
    
    <div className="row">
    <MovieList movies = {movies} handleLikesClick={addToLikes} likesComponent = {AddLikes}/>
    </div>
      
  </div>
}

export default  SearchPage;