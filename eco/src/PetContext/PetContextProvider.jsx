import React, { createContext } from 'react';
import app_pet from '../Components/Assets1/all_pet'; 

export const PetContext = createContext();

const PetContextProvider = (props) => {
  const all_pet = app_pet; 

  return (
    <PetContext.Provider value={{ all_pet }}>
      {props.children}
    </PetContext.Provider>
  );
};

export default PetContextProvider;
