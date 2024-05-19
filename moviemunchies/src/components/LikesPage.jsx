import React, { useEffect, useState } from "react";

import MovieList from "./MovieList";
import RemoveLikes from "./RemoveLikes"; 
const LikesPage = ({likes,likeSet}) => {
    const likesList= likes;
    //removes the like from the like list by reseting it
    //parameter: id, the imdbID that will be removed
    const removeLike=(id)=>{
	    let list=[];
        //goes through the list, if there is a match do =
        //not add it
	    for(var i=0;i<likes.length;i++){
	        if(id===likes[i].imdbID){}
	        else{
	            list.push(likes[i]);
	        }
	}
    //sets the like to the appropriate list.
    likeSet(list);
	
    }
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
                        <p>{movie.Genre}</p>
                        <p>{movie.Type.toUpperCase()}</p>
                        <p>{movie.Plot}</p>
                    </div>
                    <div onClick={()=>{removeLike(movie.imdbID)}} className="overlay d-flex align-items-center justify-content-center">
                        <RemoveLikes />
                    </div>
                </div>
            ))}
            </div>}
        </div>
    </>
)}

export default LikesPage;