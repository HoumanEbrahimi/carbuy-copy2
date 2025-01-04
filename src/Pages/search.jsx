import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import carData from '../carData.json';
import carModel from '../carBrand.json';
import './search.css';
import { useUserAuth } from "./UserAuthContextProvider";
import { db } from "./firebase";
import { collection, getDocs, query, where, addDoc, deleteDoc, doc } from "firebase/firestore";

const Search = ({ fav, setFav, searchResults, setSearchResults}) => {
  const [filters, setFilters] = useState({ brand: '' });
  const [popUp, setPopUp] = useState(false);
  const [modelPopup,setModelPopUp]=useState(false)
  const [filteredResults, setFilteredResults] = useState([]);
   const { user } = useUserAuth();
 
  const navigate = useNavigate();


  const [brandInfo, setBrandInfo] = useState(0);
  
    const checkBookmark = () =>{
    navigate("/bookmarks");
    
  

  }
  
  useEffect(() => {
    if (searchResults.length <=1) {
      const fetchCarData = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/cars');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          //console.log(data); // Log the data to verify the response
          setSearchResults(data);
          setFilteredResults(data);
        } catch (error) {
          console.error('Error fetching car data:', error);
        }
      };
  
      fetchCarData();
    }
  }, [searchResults.length, setSearchResults]);
  

  console.log("search results",searchResults)
  /*
  useEffect(() => {
    if (carData && carData.carData) {
      setSearchResults(carData.carData);
      setFilteredResults(carData.carData);
    } else {
      console.error("Invalid carData structure");
    }
  }, [setSearchResults]);
  */

  useEffect(() => {
    setFilteredResults(searchResults);
    
  }, [searchResults]);

  useEffect(() => {
    const storedFav = JSON.parse(localStorage.getItem('fav')) || [];
    setFav(storedFav);
  }, []);

  const handleMakePop = () => {
    setPopUp(!popUp);
  };

  const handleMakePop2 = () =>{
    setModelPopUp(!modelPopup)
  }

  const handleBrandChange = (event) => {
    const selectedBrand = event.target.value;
    setFilters({ ...filters, brand: selectedBrand });
    if (selectedBrand ==='') {
      setFilteredResults(searchResults);
    } else {
      console.log("get brand from title",searchResults.filter(car=>car.title), "bruh",selectedBrand,"another one",searchResults.filter(car=>car.title.includes(selectedBrand)))
      const filtered = searchResults.filter(car => car.title.includes(selectedBrand));
      console.log("lets go",filtered)
      setFilteredResults(filtered)
      //setFilteredResults(searchResults.filter(car => car.title.toLowerCase().includes(selectedBrand)) > 0 ? filtered : []);
      console.log("double check",filtered.length)

    }

    const index = carModel.findIndex(car => car.name.toLowerCase() === selectedBrand.toLowerCase());
    setBrandInfo(index); // Update brandInfo state

    //brandInfo = carModel.findIndex(car => car.brand.toLowerCase() === selectedBrand);
    //console.log("dasdas",carModel[brandInfo].models,selectedBrand);

  };

  const handleNotInterested = (carId) => {
    try {
      const updatedSearchResults = searchResults.filter(car => car.title !== carId);
      setSearchResults(updatedSearchResults);
      setFilteredResults(updatedSearchResults);
    } catch (error) {
      console.error(error);
    }
  };
  const handleInterested = async (carTitle) => {
    try {
      const carToBookmark = searchResults.find(car => car.title === carTitle);
      if (!carToBookmark) throw new Error(`Car with title ${carTitle} not found`);
      
      const bookmarkData = {
        ...carToBookmark,
        userId: user.uid,
      };
      
      const docRef = await addDoc(collection(db, "bookmarks"), bookmarkData);
      setFav([...fav, { id: docRef.id, ...bookmarkData }]);
  
      const updatedSearchResults = searchResults.filter(car => car.title !== carTitle);
      setSearchResults(updatedSearchResults);
      setFilteredResults(updatedSearchResults);
    } catch (error) {
      console.error(error);
    }
  };
  
  
  const handleModel = (isDisabled) =>{

    if(isDisabled){
      console.log("Model Info:", carModel[brandInfo].models, carModel[brandInfo]);

    }

  }

  const disableModel = filters.brand === '';
  return (
    <div>
      <div> 
      <button onClick={checkBookmark} className="btn btn-secondary" target="_blank" > bookmarks </button>
        <h4>Filters</h4>
        <button onClick={handleMakePop} className="btn btn-secondary">Make</button>
        {popUp && (
          <div className="popup-menu">
            <select onChange={handleBrandChange} value={filters.brand}>
              <option value="">Select a brand</option>
              {Array.from(new Set(carModel.map(car => car.name))).map((brand, index) => (
                <option key={index} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
        )}
        <button disabled={disableModel} className="btn btn-secondary"> Model </button>

      </div>
      {filters.brand && filteredResults.length === 0 && (
        <p>Brand was not found</p>
      )}
      {filteredResults.length === 0 ? (
        <div className="no-cars-message">
          <p>No cars left. Please refresh.</p>
        </div>
      ) : (
        <div className="search-results">
          {filteredResults.map((car) => (
            <div key={car.id} className="card mb-3">
              <div className="row no-gutters">
                <div className="col-md-4">
                {car.image_urls && car.image_urls.length > 0 ? (
                    <img src={car.image_urls[0]} style={{ objectFit: "contain" }} className="card-img" alt={car.title} />
                  ) : (
                    <p>No image available</p>
                  )}
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{car.title}</h5>
                    <p className="card-text">{car.trim}</p>
                    <button onClick={() => handleInterested(car.title)} className="btn btn-primary">Interested</button>
                    <button onClick={() => handleNotInterested(car.title)} className="btn btn-danger">Not Interested</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
