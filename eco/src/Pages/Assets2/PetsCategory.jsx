import React, { useContext } from 'react';
import { PetContext } from "../../PetContext/PetContextProvider";
import Items from '../../Components/Items/Items';
import './PetCategory.css';

const PetsCategory = ({ category }) => {
  const { all_product } = useContext(PetContext); // Use all_product

  return (
    <div className="shop-product">
      {all_product && all_product.map((item, i) => {  // Use all_product instead of all_pet
        if (category === item.category) {
          return (
            <div key={i} className="item-box">
              <Items 
                id={item.id}
                name={item.name}
                image={item.image}
                age={item.age}
                state={item.state}
                District={item.District}
              />
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default PetsCategory;
