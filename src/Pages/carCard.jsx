import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation
import carData from '../carData.json';
import './search.css';
import {useEffect } from 'react';
import React, { useState } from 'react';
import { useLocation } from "react-router-dom";


const CarCard = () =>{
    const location = useLocation();
    let card = location.state;

    function getKeyByValue(object, value) {
        var keys = Object.keys(card);
        return card[keys].title
    }

    function returnImage(object, value) {
        var keys = Object.keys(card);
        console.log("my "+card[keys].image_urls);
        return card[keys].image_urls[0];
    }   

    const value = getKeyByValue(card,card.title);
    const images = returnImage(card,card.image_urls);

    
    return(
        <div className="body_search">
        <h2>{value}</h2>
        {images.map((image) => (
        <img src={image} alt={value} />

        ))}
        </div>
    )
    
}

export default CarCard;