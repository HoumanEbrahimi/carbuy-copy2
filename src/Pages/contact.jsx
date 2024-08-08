import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation
import carData from '../carData.json';
import './search.css';
import {useEffect } from 'react';
import React, { useState } from 'react';
import Bookmarks from './bookmarks.jsx'

const Contact = ({fav}) =>{
  const navigate = useNavigate();

  const checkBookmark = () =>{
    navigate("/bookmarks");
  }

  useEffect(() => {
    // Automatically redirect to /bookmarks when the component mounts
    navigate("/bookmarks");
  }, [navigate]);
  
    console.log(fav)
    return(
        <div className="body_search">
        <h2 className="section" >
              Selected Cars
              
        </h2>

        {fav.map((car)=> {
          return <Bookmarks key={car}>
          </Bookmarks>;
        }
      
      )};
    </div>

    )


      
}

export default Contact;