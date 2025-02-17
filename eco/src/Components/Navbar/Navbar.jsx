import React, { useState } from 'react'
import './Navbar.css'
import petsea2 from '../Assets1/petsea2.png'
import { Link } from 'react-router-dom'
function Navbar() {
  const [menu,setMenu]= useState("Home")
  return (
    <div className='all2'>
   <div className="com-icon">
    <div className="com-img">
      <img src={petsea2}></img>

    </div>
    <div className="com-title">
      <h2>ECO ADAPTION</h2>
    </div>
   </div>
   <div className="item2">

        <ul className='menu-title' id='nav-list'>
          <li onClick={()=>(setMenu("Home"))}><Link style={{textDecoration:'none'}} to='/home'>Home</Link> {menu=="Home"?<hr/>:<></>}</li>

          <li onClick={()=>(setMenu("Dog"))}><Link style={{textDecoration:'none'}} to='/Dog'>Dog</Link> {menu=="Dog"?<hr/>:<></>}</li>
          <li onClick={()=>(setMenu("Cat"))}><Link style={{textDecoration:'none'}}  to='/Cat'>Cat</Link>{menu=="Cat"?<hr/>:<></>}</li>
          <li onClick={()=>(setMenu("Fish"))}><Link style={{textDecoration:'none'}}  to='/Fish'>Fish</Link> {menu=="Fish"?<hr/>:<></>}</li>
          <li onClick={()=>(setMenu("Birds"))}><Link style={{textDecoration:'none'}}  to='/Bird'>Birds</Link>{menu=="Birds"?<hr/>:<></>}</li>
          <li onClick={()=>(setMenu("All"))}><Link style={{textDecoration:'none'}} to='/All'>All</Link> {menu=="All"?<hr/>:<></>}</li>
          <li onClick={()=>(setMenu("Save_me"))}><Link style={{textDecoration:'none'}} to='/Save_me'>Guardian Release</Link> {menu=="Save_me"?<hr/>:<></>}</li>

        <div className="button102">
          <button>Login</button>
        </div>
        </ul>
   </div>
    </div>
  )
}

export default Navbar