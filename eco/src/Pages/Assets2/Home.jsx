import React from 'react';
import banner2 from './asserts/banner2.jpg'; 
import './Home.css';




function Home() {
  return (
    <div className="all1">
      <div className="ine">
        
        <img src={banner2} alt="Background" className="background-image" />

      </div>
      <div className="title1">
        <h1>Pets Avalable</h1>
      </div>
      <div className="master">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
      </div>
     <div className="title2">

        <h1>Adopt a pet today</h1>
     </div>
        <div className="animations">
          
        </div>
      
      </div>

  );
}

export default Home;
