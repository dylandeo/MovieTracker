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
    //states that are needed for mongo server
    const [likes, setLikes] = useState([]);
    const [watchLater, setWatchLater] = useState([]);

    //this function adds all watch later movies when page is loaded
    const LLater =async (list)=>{
        //list to be set
        let lis=[];
        //for each element in the list, fetch and only set likes when
        //the list is complete
        for(let i=0;i<list.length;i++){
            fetch(`http://www.omdbapi.com/?i=${list[i]}&apikey=ac6774f1`).then((data)=>{
                return data.json();
            }).then((d)=>{
                lis.push(d);
                if(lis.length===list.length){
                    setLikes(lis);
                }
            });
            
        }

    }
    
    //this function adds all liked movies when page is loaded
    const wLater =async (list)=>{
        //list to be completed
        let lis=[];
        //for each element in list, fetch and apply when it is full.
        for(let i=0;i<list.length;i++){
            fetch(`http://www.omdbapi.com/?i=${list[i]}&apikey=ac6774f1`).then((data)=>{
                return data.json();
            }).then((d)=>{
                lis.push(d);
                if(lis.length==list.length){
                    setWatchLater(lis);
                }
            });
            
        }

    }
    //mongo id for user
    const [mId,setmId ]=useState(-1);
    //checks if setup is complete
    const [didMount, setdidMount]=useState(false);

    //finds the next unused id from mongo. It will always be one higher than the max
    const findID = async ()=>{
        //if the id doesn't exist, then set it to findid
        if(localStorage.getItem("mId")===null){
        var dd;
        const x= await fetch("http://localhost:4000/api/findid").then((data)=>{
        return data.json();
        }).then((d)=>{
        dd=d.num;
        localStorage.setItem("mId",dd);
        });
        setmId(dd);
        
        //creates a new user for the new id
        const raw =await fetch("http://localhost:4000/api/cUser",{method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({id:dd})
    });
        }
        // if the id already exists, then set both watchlater and likes to the mongodb data.
        else{
        setmId(Number(localStorage.getItem("mId")));
        const raw2=fetch(`http://localhost:4000/api/getUserList?watch=true&id=${Number(localStorage.getItem("mId"))}`).then((data)=>{
            return data.json();
        }).then(
        (d)=>{
            wLater(d);
        } 
        );
        const raw3=fetch(`http://localhost:4000/api/getUserList?watch=false&id=${Number(localStorage.getItem("mId"))}`).then((data)=>{
            return data.json();
        }).then(
        (d)=>{
            LLater(d);
        } 
        );

        }
    }
    
    const [movies, setMovies] = useState([]);
    
    const [searchValue, setSearchValue] = useState('');
    const location = useLocation();

    const getMovieRequest = async (searchValue) => {
        if (searchValue.trim() === '') return;
        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=ac6774f1`;
        const response = await fetch(url);
        const response_json = await response.json();
        /*if(localStorage.getItem("userid")===null){
            let idd=findID();
            localStorage.setItem("userid",idd);
            createUser(idd);
        }
        else{
            
        }*/
        if (response_json.Search) {
            setMovies(response_json.Search);
        } else {
            setMovies([]);
        }
    };
    
    
    const createUser=(id)=>{


    }
    //sets mongodb likes to current like list when changed
    const transferLikes=()=>{
        //gets list of imdbids
        let list=[];
        for(var i=0;i<likes.length;i++){
            list.push(likes[i].imdbID);
        }
        //posts list
        fetch("http://localhost:4000/api/updateUser",{method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({like:"true",watch:"false",id:mId,upd:list})
    });
    }
    //sets mongodb watchlater to current list when changed
    const transferWatch=()=>{
        //gets list of imdbids
        let list=[];
        for(var i=0;i<watchLater.length;i++){
            list.push(watchLater[i].imdbID);
        }
        //posts list
        fetch("http://localhost:4000/api/updateUser",{method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({like:"false",watch:"true",id:mId,upd:list})
    });
    }
    //the initialization function that plays when page
    //is loaded
    useEffect(()=>{
        if(!didMount){
        findID();
        setdidMount(true);
        }
    },[]);
    //runs when likes change
    useEffect(()=>{
        transferLikes();
    },[likes]);
    //runs when watchlist changes
    useEffect(()=>{
        transferWatch();
    },[watchLater]);
    
    useEffect(() => {
        
        getMovieRequest(searchValue);
        console.log(mId);
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
