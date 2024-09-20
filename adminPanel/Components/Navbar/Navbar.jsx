import React from 'react'
import './Navbar.css'

import set from './Assets/set.png'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="nav">

      <h1>Welcome To Admin Panel</h1>
      <img src={set}  alt=''></img>
      </div>
        

    </div>
  )
}

export default Navbar