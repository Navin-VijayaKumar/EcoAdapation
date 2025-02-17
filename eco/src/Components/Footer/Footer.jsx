import React from 'react'
import './Footer.css'
import linkedin from '../Assets1/linkedin.png';
import x from '../Assets1/x.png';
import fbns from '../Assets1/fbns.png'
const Footer = () => {
  return (
    <div className='footer-con'>
      <div className="footer-icons">
        <img src={linkedin}></img>
        <img src={fbns}></img>
        <img src={x}></img>
      </div>
      <div className="footer-heading">
        <h4>About</h4>

      </div>
      <div className="footer-about">
        <p>Eco-Adoption is an innovative online platform designed to simplify the pet adoption process. It allows users not only to adopt pets but also to list their own pets for adoption, creating a supportive community for pet lovers. One of the standout features of the website is its state-wise search filter, which covers all states in India, enabling users to easily find pets available in their specific region. This makes the search process more convenient and localized. Additionally, the platform offers the option to place orders for pets directly, streamlining the adoption journey. With its intuitive and user-friendly interface, Eco-Adoption bridges the gap between those looking to adopt a pet and those seeking a new home for their furry friends, ensuring that every pet finds a loving family.</p>
      
      </div>
    </div>
  )
}

export default Footer