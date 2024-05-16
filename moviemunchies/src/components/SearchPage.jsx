// SearchPage.jsx
import React from 'react';
import MovieList from './MovieList';
import AddLikes from './AddLikes';

const SearchPage = ({ searchValue, setSearchValue, movies, handleLikesClick, handleWatchLaterClick, currentRoute }) => {
    return (
        <div className="container-fluid movie-app">
            <div className="row">
                <MovieList
                    movies={movies}
                    handleLikesClick={handleLikesClick}
                    handleWatchLaterClick={handleWatchLaterClick}
                    likesComponent={AddLikes}
                    currentRoute={currentRoute}
                />
            </div>
        </div>
    );
};

export default SearchPage;
