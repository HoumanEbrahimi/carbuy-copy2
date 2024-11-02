import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './bookmarks.css';

const Recommendation = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [fav, setFav] = useState([]);

  // Load bookmarked cars from localStorage
  useEffect(() => {
    const storedFav = JSON.parse(localStorage.getItem('fav')) || [];
    setFav(storedFav);
  }, []);

  // Fetch recommendations based on bookmarks (only if there are bookmarked cars)
  useEffect(() => {
    if (fav.length > 0) {
      axios.post('http://localhost:5000/api/recommend', { bookmarked_cars: fav })
        .then(response => {
          setRecommendations(response.data);
        })
        .catch(error => {
          console.error('Error fetching recommendations:', error);
        });
    }
  }, [fav]);  // Only runs when `fav` (bookmarked cars) changes

  return (
    <div>
      <h2>Recommended Cars</h2>
      {fav.length > 0 ? (
        <div className="recommended-results">
          {recommendations.map((car, index) => (
            <div key={index} className="card mb-3">
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img src={car.image_urls[0]} className="card-img" alt={car.title} />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{car.title}</h5>
                    <p className="card-text">{car.trim}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No cars in bookmarks. Add cars to your bookmarks to get recommendations.</p>
      )}
    </div>
  );
};

export default Recommendation;
