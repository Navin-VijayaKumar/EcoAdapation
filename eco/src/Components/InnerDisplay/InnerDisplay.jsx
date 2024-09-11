import React from 'react';
import './InnerDisplay.css';

const InnerDisplay = (props) => {
  const { product } = props;

  return (
    <div className="displayProduct">
      <div className="display-Left">
        <div className="display-Image">
          <img className="main-image" src={product?.image} alt={product?.name} />
        </div>
      </div>
      <div className="display-Right">
        <h1>{product?.name}</h1>
        <div className="details">
          <h2>Category: {product?.category}</h2>
          <h2>Age: {product?.age}</h2>
          <h2>Address: {product?.address}</h2>
          <h2>State: {product?.state}</h2>
          <h2>Phone: {product?.PhoneNumber}</h2>
          <h2>Email: {product?.Email}</h2>
          <h2>District: {product?.District}</h2>
        </div>
      </div>
    </div>
  );
};

export default InnerDisplay;
