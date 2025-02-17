import React from 'react';
import './SelectState.css';
import { Link } from 'react-router-dom';
function SelectState(props) {
    return (
      <div className="items">
  <Link to={`/pets/${props.id}`} >
  <img className="itemsimg"src={props.image} alt={props.name} />
        <p>Vareity : {props.name}</p>
        <p>Age : {props.age}</p>
        <p>State : {props.state}</p>
        <p>District : {props.District}</p></Link>  
      </div>
    );
  }

export default SelectState;
