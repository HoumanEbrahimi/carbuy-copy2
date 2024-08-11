import React, { useEffect,useState } from 'react';
import './bookmarks.css';
import { useNavigate } from 'react-router';

const Bookmarks = () => {
  const [fav, setFav] = useState([]);

  const navigate = useNavigate();

  
  useEffect(() => {
    const storedFav = JSON.parse(localStorage.getItem('fav')) || [];
    setFav(storedFav);
  }, []);

  window.onbeforeunload = function() {
    console.log("bruh")
    localStorage.clear();
 }

 // useEffect(() =>{
 //         const handleBeforeUnload = () => {
 //   localStorage.removeItem('fav');
 // };

 // window.addEventListener('beforeunload', handleBeforeUnload);

 // return () => {
 //   window.removeEventListener('beforeunload', handleBeforeUnload);
 // };
//}, []);

  

  return (
    <div>
      <h2>Bookmarked Cars</h2>
        <div className="bookmarked-results">

          {fav.map((car) => (
            <div key={car.id} className="card mb-3">
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img src={car.imagePath} className="card-img" alt={car.title} />
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
      
    </div>
  );
};

export default Bookmarks;
