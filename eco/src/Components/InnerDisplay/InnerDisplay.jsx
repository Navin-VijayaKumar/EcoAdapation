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
      <div className="details">
  <div className="details-item">
    <h2>Category:</h2><p>{product?.category}</p>
  </div>
  <div className="details-item">
    <h2>Age:</h2><p>{product?.age}</p>
  </div>
  <div className="details-item">
    <h2>Address:</h2><p>{product?.address}</p>
  </div>
  <div className="details-item">
    <h2>State:</h2><p>{product?.state}</p>
  </div>
  <div className="details-item">
    <h2>Phone:</h2><p>{product?.PhoneNumber}</p>
  </div>
  <div className="details-item">
    <h2>Email:</h2><p>{product?.Email}</p>
  </div>
  <div className="details-item">
    <h2>District:</h2><p>{product?.District}</p>
  </div>
</div>

      <button className='submit' disabled={true} value='submit'>Adopt</button>
      </div>
    </div>
  );
};

export default InnerDisplay;
