import React, { useEffect, useState } from "react";

import MovieList from "./MovieList";

const LikesPage = ({likes}) => {
    const likesList= likes;
    return (
        <>
        <h1>LIKES PAGE</h1>
        <div>
            {likes.length === 0 ? (
                <p>You haven't liked anything yet</p>
            ):
            <div>
               {likes.map((movie, index) => (
                <div key={index} className="image-container d-flex justify-content-start m-2">
                    <img src={movie.Poster} alt="movie poster"></img>
                    <div className="d-flex flex-column align-items-start">
                        <h2>{movie.Title}</h2>
                        <p>{movie.Year}</p>
                        <p>{movie.Type.toUpperCase()}</p>
                        <p>{movie.Plot}</p>
                    </div>
                    
                </div>
            ))}
            </div>}
        </div>
    </>
)}

export default LikesPage;