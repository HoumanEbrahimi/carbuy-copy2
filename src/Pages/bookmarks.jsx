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
  /*
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Set a flag in session storage to indicate the window is being closed
      sessionStorage.setItem('isClosing', 'true');
    };

    const handleUnload = () => {
      if (sessionStorage.getItem('isClosing') === 'true') {
        console.log('Window closed');
        localStorage.removeItem('fav'); // Clear 'fav' from local storage
      }
      sessionStorage.removeItem('isClosing'); // Clean up the flag
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
    };
  }, []);
  */

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
