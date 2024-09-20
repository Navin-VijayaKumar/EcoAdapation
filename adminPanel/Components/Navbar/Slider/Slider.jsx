import React from 'react'
import './Slider.css'
import { Link } from 'react-router-dom'
import f1n from '../Assets/f1n.png'
import scn from '../Assets/scn.png'


const Slider = () => {
  return (
    <div className='slider'>


       <div className="slideritems">
        <Link to={'/addproduct'} style={{textDecoration:"none"}}>
             <img src={scn} className='nav-cart' alt=''></img>
            <h2>Add Pet</h2>
        </Link>
        </div>
           <div className="slideritems">
           <Link to={'/listproduct'} style={{textDecoration:"none"}}>
              <img src={f1n} className='nav-folder' alt=''></img>
            <h2>List All Pets</h2>
           </Link>
           </div>
    </div>
  )
}

export default Slider