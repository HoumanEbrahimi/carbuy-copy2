import React, { createContext, useState } from 'react';

export const BookmarksContext = createContext();

export const BookmarksProvider = ({ children }) => {
  const [fav, setFav] = useState([]);

  return (
    <BookmarksContext.Provider value={{ fav, setFav }}>
      {children}
    </BookmarksContext.Provider>
  );
};
