import React, { useState } from 'react';
import './InnerDisplay.css';

const InnerDisplay = (props) => {
  const { product } = props; 
  const [showPopup, setShowPopup] = useState(false);
  const [emailBody, setEmailBody] = useState('');
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [description, setDescription] = useState('');

  const handleAdoptClick = () => {
    setShowPopup(true);
  };

  const handleSendEmail = async () => {

    const bodyContent = `
      Pick-up Date: ${date}-${month}-${year}
      Contact Number: ${contactNumber}
      Email: ${userEmail}
      Pet ID: ${product?.id}
      Description: ${description}
    `;

    // Set the constructed body content as the emailBody
    setEmailBody(bodyContent);

    const emailData = {
      to: product?.Email,  
      subject: 'Adoption Inquiry',
      text: bodyContent,  
      productId: product?.id, 
    };

    try {
      await fetch('http://localhost:4000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });
      alert('Email sent successfully!');
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
            <h3>Pet Ordering Details</h3>
         
           <div className="content">

            <input 
              type="text" 
              placeholder="Enter Date (DD)" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="Enter Month (MM)" 
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="Enter Year (YYYY)" 
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            <input 
              type="email" 
              placeholder="Enter Your Email" 
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="Enter Contact Number" 
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              />
              </div>
            <textarea
              placeholder="Write additional description here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              />
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
