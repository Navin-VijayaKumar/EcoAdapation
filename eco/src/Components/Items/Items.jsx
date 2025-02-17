import React from 'react';
import './Items.css';
import { Link } from 'react-router-dom';

function Items(props) {
  return (
    <div className="items">
     <Link to={`/pets/${props.id}`} >
     <img className="itemsimg" src={props.image} alt='' />
      <p>Vareity : {props.name}</p>
      <p>Age : {props.age}</p>
      <p>State : {props.state}</p></Link>
      <p>District : {props.District}</p>
    </div>
  );
}

export default Items;
