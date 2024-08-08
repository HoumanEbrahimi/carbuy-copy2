import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link } from 'react-router-dom';
import { Routes, Route , Navigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/js/src/collapse.js";
import SearchCars from './Pages/search'
import Bookmarks from './Pages/bookmarks.jsx'
import Recommandaion from './Pages/recommandation'
import React, { useState , useEffect } from 'react';
import carData from './carData.json';
import Contact from './Pages/contact'
import { BookmarksProvider } from './Pages/BookmarksContext';




function App() {

const [fav, setFav] = useState([]);
const [searchResults, setSearchResults] = useState([carData])
const [filteredResults, setFilteredResults] = useState([]);



useEffect(() => {
  const storedFav = JSON.parse(localStorage.getItem('fav')) || [];
  setFav(storedFav);
}, []);
//  const handleBeforeUnload = () => {
//    localStorage.removeItem('fav');
//  };

  //window.addEventListener('beforeunload', handleBeforeUnload);

//  return () => {
//    window.removeEventListener('beforeunload', handleBeforeUnload);
//  };
//}, []);

<script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>

  return (
    <div className="App">
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
&nbsp;&nbsp;
  <a class="navbar-brand  mr-auto" style={{ marginRight: '10px',display:"inline-flex !important"}} to="/">
  <img 
  style={{position:"absolute",left:"10px",top:"5px"}}
    
    src="https://github.com/HoumanEbrahimi/Lol/blob/main/TMI.png?raw=true"
    alt=""
    width="50"
    height="50"
    
    />   
  </a>

  <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div style={{marginLeft:"30px"}} class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a  class="nav-link" href="/">Home <span class="sr-only"></span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/items" >Marketplace</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/bookmarks" >Bookmarks</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/projects" >Contact Us</a>
      </li>
    </ul>
  </div>
</nav>
<BrowserRouter>
      <Routes>
      <Route path="/" />
        <Route path="/items" element={<SearchCars fav={fav} setFav={setFav} searchResults={searchResults} setSearchResults={setSearchResults} />}/>
        <Route path="/bookmarks" element={<Bookmarks fav={fav}/>}/>

      </Routes>
    </BrowserRouter>

    </div>
    

  );
}

export default App;

