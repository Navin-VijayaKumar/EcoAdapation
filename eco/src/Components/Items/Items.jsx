import React from 'react';
import './Items.css';

function Items(props) {
  return (
    <div className="items">
      <img src={props.image} alt={props.name} />
      <p>Vareity : {props.name}</p>
      <p>Age : {props.age}</p>
      <p>State : {props.state}</p>
      <p>District : {props.District}</p>
    </div>
  );
}

export default Items;
