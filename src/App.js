import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";

import logo from "./logo.svg";
import Home from "./Pages/home.jsx";
import Login from "./Pages/login.jsx";
import Signup from "./Pages/signup.jsx";
import SearchCars from "./Pages/search";
import Bookmarks from "./Pages/bookmarks.jsx";
import Recommandaion from "./Pages/recommandation.jsx";
import Contact from "./Pages/contact";
import UserAuthContextProvider from "./Pages/UserAuthContextProvider";
import { useUserAuth } from "./Pages/UserAuthContextProvider";
import { useNavigate } from "react-router-dom";
import { BookmarksProvider } from "./Pages/BookmarksContext";
import CarCard from "./Pages/carCard.jsx";  
import carData from "./carData.json";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/js/src/collapse.js";

function App() {
  const [fav, setFav] = useState([]);
  const [searchResults, setSearchResults] = useState([carData]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  //const {logOut} = useUserAuth();
  //const navigate = useNavigate();

  /*
  const handleLogout = async () => {
    try{
      await logOut();
      navigate("/"); // Redirect to the login or homepage

    }   catch(error){
      console.error("Error during logout:", error.message);

    }
    
  }
    */
  return (
    <div className="App">
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          &nbsp;&nbsp;
          <Link
            className="navbar-brand mr-auto"
            style={{ marginRight: "10px", display: "inline-flex !important" }}
            to="/"
          >
            <img
              style={{ position: "absolute", left: "10px", top: "5px" }}
              src="https://github.com/HoumanEbrahimi/Lol/blob/main/TMI.png?raw=true"
              alt="Logo"
              width="50"
              height="50"
            />
          </Link>

          <button
            className="navbar-toggler collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div style={{ marginLeft: "30px" }} className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/items">Marketplace</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/bookmarks">Bookmarks</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/recommandation">Recommandaions</Link>
              </li>
            </ul>
          </div>

        </nav>
        <UserAuthContextProvider>
          <BookmarksProvider>
              <Row>
                <Col>
                  <Routes>
                    <Route
                      path="/home"
                      element={
                        loggedIn ? (
                          <Home />
                        ) : (
                          <Navigate to="/" replace />
                        )
                      }
                    />
                    <Route
                      path="/"
                      element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />}
                    />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                      path="/items"
                      element={
                        <SearchCars
                          fav={fav}
                          setFav={setFav}
                          searchResults={searchResults}
                          setSearchResults={setSearchResults}
                        />
                      }
                    />
                    <Route path="/bookmarks" element={<Bookmarks fav={fav} />} />
                    <Route path="/recommandation" element={<Recommandaion fav={fav} />} />
                    <Route path="/car/:id" element={<CarCard />} />
                  </Routes>
                </Col>
              </Row>
          </BookmarksProvider>
        </UserAuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
