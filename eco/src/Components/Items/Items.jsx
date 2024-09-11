import React from 'react';
import './Items.css';
import { Link } from 'react-router-dom';

function Items(props) {
  return (
    <div className="items">
     <Link to={`/pets/${props.id}`} ><img src={props.image} alt={props.name} /></Link>
      <p>Vareity : {props.name}</p>
      <p>Age : {props.age}</p>
      <p>State : {props.state}</p>
      <p>District : {props.District}</p>
    </div>
  );
}

export default Items;
