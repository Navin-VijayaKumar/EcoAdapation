import React, { useContext, useState } from 'react';
import { PetContext } from "../PetContext/PetContextProvider";
import SelectState from "../Components/SelectState/SelectState";
import './AllCategory.css';

const AllCategory = () => {
  const { all_pet } = useContext(PetContext); 
  const [selectedState, setSelectedState] = useState(''); 


  const filteredPets = selectedState 
    ? all_pet.filter(pet => pet.state === selectedState) 
    : all_pet;

  return (
    <div className="filter-container">
     
      <div className="filter-options">
      <h2>Filter by State:</h2>
        <select 
          id="stateFilter" 
          onChange={(e) => setSelectedState(e.target.value)} 
          value={selectedState}
        >
          <option value="">All</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Kerala">Kerala</option>
          <option value="State 3">State 3</option>
          <option value="State 4">State 4</option>
          <option value="State 5">State 5</option>
        </select>
      </div>

     
      <div className="shop-product">
        {filteredPets.length > 0 ? (
          filteredPets.map((item, i) => (
            <div key={i} className="item-box">
              <SelectState 
                id={item.id} 
                name={item.name} 
                image={item.image} 
                age={item.age} 
                state={item.state} 
                District={item.District} 
              />
            </div>
          ))
        ) : (
          <div className="notfound">

            <p>No pets available for the selected state.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCategory;
