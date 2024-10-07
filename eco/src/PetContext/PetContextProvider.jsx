import React, { createContext, useState, useEffect } from 'react';

export const PetContext = createContext(null);

const PetContextProvider = (props) => {
 
  const [all_product, setall_product] = useState([]);

  useEffect(() => {
    fetch("https://ecoadapation-backend.onrender.com")
      .then((response) => response.json())
      .then((data) => setall_product(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);
  const contextValue = {all_product};

  return (
    <PetContext.Provider value={contextValue}>
      {props.children}
    </PetContext.Provider>
  );
};

export default PetContextProvider;
