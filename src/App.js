import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/js/src/collapse.js";
import SearchCars from './Pages/search';
import Bookmarks from './Pages/bookmarks.jsx';
import Recommandaion from './Pages/recommandation';
import React, { useState, useEffect } from 'react';
import carData from './carData.json';
import Contact from './Pages/contact';
import { BookmarksProvider } from './Pages/BookmarksContext';

function App() {
  const [fav, setFav] = useState([]);
  const [searchResults, setSearchResults] = useState([carData]);
  const [filteredResults, setFilteredResults] = useState([]);

  //  const handleBeforeUnload = () => {
  //    localStorage.removeItem('fav');
  //  };

  //window.addEventListener('beforeunload', handleBeforeUnload);

  //  return () => {
  //    window.removeEventListener('beforeunload', handleBeforeUnload);
  //  };
  //}, []);

  return (
    <div className="App">
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          &nbsp;&nbsp;
          <Link className="navbar-brand mr-auto" style={{ marginRight: '10px', display: "inline-flex !important" }} to="/">
            <img
              style={{ position: "absolute", left: "10px", top: "5px" }}
              src="https://github.com/HoumanEbrahimi/Lol/blob/main/TMI.png?raw=true"
              alt=""
              width="50"
              height="50"
            />
          </Link>

          <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div style={{ marginLeft: "30px" }} className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Home <span className="sr-only"></span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/items">Marketplace</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/bookmarks">Bookmarks</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/projects">Contact Us</Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<div />} />
          <Route path="/items" element={<SearchCars fav={fav} setFav={setFav} searchResults={searchResults} setSearchResults={setSearchResults} />} />
          <Route path="/bookmarks" element={<Bookmarks fav={fav} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
