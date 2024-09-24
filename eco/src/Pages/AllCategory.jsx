import React, { useContext, useState } from 'react';
import { PetContext } from "../PetContext/PetContextProvider";
import SelectState from "../Components/SelectState/SelectState";
import './AllCategory.css';

const AllCategory = () => {
  const { all_product } = useContext(PetContext);  // Destructure to get all_product from context
  const [selectedState, setSelectedState] = useState(''); 

  console.log(all_product);  // Check if data is being fetched properly

  const filteredPets = selectedState 
    ? all_product.filter(pet => pet.state === selectedState)  // Use all_product here
    : all_product;

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
          <option value="Andhra Pradesh">Andhra Pradesh</option>
          <option value="Assam">Assam</option>
          <option value="Goa">Goa</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Haryana">Haryana</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Madhya Pradesh">Madhya Pradesh</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Manipur">Manipur</option>
          <option value="Punjab">Punjab</option>
          <option value="Rajasthan">Rajasthan</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
          <option value="Uttarakhand">Uttarakhand</option>
          <option value="West Bengal">West Bengal</option>
        </select>
      </div>

      <div className="shop-product">
        {filteredPets && filteredPets.length > 0 ? (
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
