import React from 'react';
import MovieList from './MovieList';
import AddLikes from './AddLikes';

const SearchPage = ({ searchValue, setSearchValue, movies, handleLikesClick }) => {
  return (
    <div className="container-fluid movie-app">
      <div className="row">
        <MovieList movies={movies} handleLikesClick={handleLikesClick} likesComponent={AddLikes} />
      </div>
    </div>
  );
};

export default SearchPage;
