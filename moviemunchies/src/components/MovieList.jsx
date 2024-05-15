import React, { useEffect, useState } from "react";
import axios from "axios";
import AddLikes from "./AddLikes";
import SearchPage from "./SearchPage";

const MovieList = (props) => {
    const LikesComponent = props.likesComponent;
    const [moviesWithPlot, setMoviesWithPlot] = useState([]);

    useEffect(() => {
        const fetchMoviesWithPlot = async () => {
            try {
                const apiKey = "ac6774f1"; // Replace with your actual API key
                const requests = props.movies.map(movie =>
                    axios.get(`http://www.omdbapi.com/?i=${movie.imdbID}&plot=full&apikey=${apiKey}`)
                );
                const responses = await Promise.all(requests);
                const moviesWithPlotData = responses.map(response => response.data);
                setMoviesWithPlot(moviesWithPlotData);
            } catch (error) {
                console.error("Error fetching movies with plot:", error);
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
                    <div onClick={() => props.handleLikesClick(movie)} className="overlay d-flex align-items-center justify-content-center">
                        <LikesComponent />
                    </div>
                </div>
            ))}
        </>
    );
}

export default MovieList;
