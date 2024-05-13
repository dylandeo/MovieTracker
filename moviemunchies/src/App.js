import React from 'react';
import LikesPage from './components/LikesPage';
import WatchLaterPage from './components/WatchLaterPage';
import SearchPage from './components/SearchPage';
import NavBar from './components/NavBar';


function App() {
  let page
switch(window.location.pathname){
  case "/":
    page = <SearchPage />
    break
  case "/likes":
    page = <LikesPage />
    break 
  case "/watch-later":
    page = <WatchLaterPage />
    break
}

  return <>
  <NavBar />
    <div className="container"> 
      {page} 
    </div>

  </>
}

export default App;
