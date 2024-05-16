// MovieList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddLikes from './AddLikes';
import AddToWatchLater from './AddWatchLater'; // Import AddToWatchLater component
import { useLocation } from 'react-router-dom'; // Import useLocation hook

const MovieList = (props) => {
    const [moviesWithPlot, setMoviesWithPlot] = useState([]);
    const location = useLocation(); // Get current route location

    useEffect(() => {
        const fetchMoviesWithPlot = async () => {
            try {
                const apiKey = 'ac6774f1';
                const requests = props.movies.map((movie) =>
                    axios.get(`http://www.omdbapi.com/?i=${movie.imdbID}&plot=full&apikey=${apiKey}`)
                );
                const responses = await Promise.all(requests);
                const moviesWithPlotData = responses.map((response) => response.data);
                setMoviesWithPlot(moviesWithPlotData);
            } catch (error) {
                console.error('Error fetching movies with plot:', error);
            }
        };

        fetchMoviesWithPlot();
    }, [props.movies]);

    return (
        <>
            {moviesWithPlot.map((movie, index) => (
                <div key={index} className="image-container d-flex justify-content-start m-2">
                    <img src={movie.Poster} alt="movie poster"></img>
                    <div className="d-flex flex-column align-items-start">
                        <h2>{movie.Title}</h2>
                        <p>{movie.Year}</p>
                        <p>{movie.Type.toUpperCase()}</p>
                        <p>{movie.Plot}</p>
                    </div>
                    <div className="overlay d-flex align-items-center justify-content-center">
                        {location.pathname !== '/watch-later' && ( // Conditionally render AddLikes component
                            <div onClick={() => props.handleLikesClick(movie)}>
                                <AddLikes />
                            </div>
                        )}
                        {location.pathname !== '/watch-later' && ( // Conditionally render AddToWatchLater component
                            <div onClick={() => props.handleWatchLaterClick(movie)} style={{ marginLeft: '10px' }}>
                                <AddToWatchLater />
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
};

export default MovieList;
