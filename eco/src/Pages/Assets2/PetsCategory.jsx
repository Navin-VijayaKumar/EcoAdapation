import React, { useContext } from 'react';
import { PetContext } from "../../PetContext/PetContextProvider";
import Items from '../../Components/Items/Items';
import './PetCategory.css';

const PetsCategory = ({ category }) => {
  const { all_pet } = useContext(PetContext);

  return (
    <div className="shop-product">
       
      {all_pet && all_pet.map((item, i) => {
        

     
        if (category === item.category) {
          return (
            <div key={i} className="item-box">
              <Items id={item.id} name={item.name} image={item.image} age={item.age} state={item.state}  District={item.District}/>

            </div>
              
          );
          
        }
        else{
          return null;
        }
      
          
       
        
        
      }
      
    )}
    </div>
  );
};

export default PetsCategory;
