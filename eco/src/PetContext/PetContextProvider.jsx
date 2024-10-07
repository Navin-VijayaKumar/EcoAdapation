import React, { createContext, useState, useEffect } from 'react';

export const PetContext = createContext(null);

const PetContextProvider = (props) => {
  const [all_product, setall_product] = useState([]);

  useEffect(() => {
    // Ensure that you're pointing to the backend with HTTPS
    fetch("https://ecoadapation-backend.onrender.com/allproducts", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setall_product(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const contextValue = { all_product };

  return (
    <PetContext.Provider value={contextValue}>
      {props.children}
    </PetContext.Provider>
  );
};

export default PetContextProvider;
