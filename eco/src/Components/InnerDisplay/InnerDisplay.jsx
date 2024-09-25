import React, { useState } from 'react';
import './InnerDisplay.css';

const InnerDisplay = (props) => {
  const { product } = props; 
  const [showPopup, setShowPopup] = useState(false);
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [description, setDescription] = useState('');

  const handleAdoptClick = () => {
    setShowPopup(true);
  };

  const handleSendEmail = async () => {
    if (!email || !date || !contactNumber) {
      alert('Please fill out all the required fields.');
      return;
    }

    const emailData = {
      to: product?.Email,  // Ensure this is the recipient's email address
      subject: 'Adoption Inquiry',
      productId: product?.id,
      date,  
      email,  
      contactNumber,  
      description,
    };

    if (!emailData.to) {
      alert('The recipient email address is missing.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),  // Send the form data
      });

      if (response.ok) {
        alert('Email sent successfully!');
      } else {
        alert('Failed to send email.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email.');
    }

    setShowPopup(false);
  };

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
            <h2>Pet id:</h2><p>{product?.id}</p>
          </div>
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

        <button className='submit' onClick={handleAdoptClick}>Adopt</button>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Pet Adoption Inquiry</h3>
            
            <div className="all">
              <div>
                <label>Date:</label>
                <input 
                  type="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)} 
                />
              </div>

              <div>
                <label>Email:</label>
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>

              <div>
                <label>Contact Number:</label>
                <input 
                  type="tel" 
                  placeholder="Enter your contact number" 
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)} 
                />
              </div>
            </div>

            <div>
              <label>Description:</label>
              <textarea 
                placeholder="Provide details..." 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
              />
            </div>

            <div className="button">
              <button className='b1' onClick={handleSendEmail}>Place Order</button>
              <button className='b2' onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InnerDisplay;
