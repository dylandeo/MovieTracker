import React from "react";
import AddLikes from "./AddLikes";
import SearchPage from "./SearchPage";

const MovieList = (props) => {
    const LikesComponent = props.likesComponent
    return (
        <>
        {props.movies.map((movie, index)=> (
        <div className="image-container d-flex justify-content-start m-2">
            <img src={movie.Poster} alt="movie poster"></img>
            <div className="d-flex align-items-center"><h2>{movie.Title}</h2>
            <p>{movie.Year}</p>
            <p>{movie.Type}</p>
            <div>{movie.plot}</div>
            </div>
            
            <div onClick={()=> props.handleLikesClick(movie)} className="overlay d-flex align-items-center justify-content-center">
                <LikesComponent />
            </div>
        </div>))}
        </>
    )
}

export default MovieList;