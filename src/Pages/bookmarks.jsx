import React, { useEffect, useState } from "react";
import "./bookmarks.css";
import { useNavigate } from "react-router";
import { useUserAuth } from "./UserAuthContextProvider";
import { db } from "./firebase";
import { collection, getDocs, query, where, addDoc, deleteDoc, doc } from "firebase/firestore";

const Bookmarks = () => {
  const [fav, setFav] = useState([]);
  const { user } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.uid) {
      const fetchBookmarks = async () => {
        const q = query(collection(db, "bookmarks"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const fetchedFav = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFav(fetchedFav);
      };

      fetchBookmarks();
    }
  }, [user]);

  const removeBookmark = async (bookmarkId) => {
    await deleteDoc(doc(db, "bookmarks", bookmarkId));
    setFav(fav.filter(item => item.id !== bookmarkId));
  };

  const handleCardClick = (car) => {
    navigate(`/car/${car.id}`, { state: { car } });
  }

  return (
    <div>
      <h2>Bookmarked Cars</h2>
      <div className="bookmarked-results">
        {fav.map((car) => (
          <div key={car.id} className="card mb-3" onClick={() => handleCardClick(car)} style={{ cursor: "pointer" }}
          >
            <div className="row no-gutters">
              <div className="col-md-4">
                <img src={car.imagePath} className="card-img" alt={car.title} />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{car.title}</h5>
                  <p className="card-text">{car.trim}</p>
                  <button onClick={() => removeBookmark(car.id)} className="btn btn-danger">
                    Remove
                  </button>
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
