import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

function Navbar() {
  const [menu,setMenu]= useState("Home")
  return (
    <div className='all'>
   
        <ul className='menu-title'>
          <li onClick={()=>(setMenu("Home"))}><Link style={{textDecoration:'none'}} to='/'>Home</Link> {menu=="Home"?<hr/>:<></>}</li>
          <li onClick={()=>(setMenu("Dog"))}><Link style={{textDecoration:'none'}} to='/Dog'>Dog</Link> {menu=="Dog"?<hr/>:<></>}</li>
          <li onClick={()=>(setMenu("Cat"))}><Link style={{textDecoration:'none'}}  to='/Cat'>Cat</Link>{menu=="Cat"?<hr/>:<></>}</li>
          <li onClick={()=>(setMenu("Fish"))}><Link style={{textDecoration:'none'}}  to='/Fish'>Fish</Link> {menu=="Fish"?<hr/>:<></>}</li>
          <li onClick={()=>(setMenu("Birds"))}><Link style={{textDecoration:'none'}}  to='/Bird'>Birds</Link>{menu=="Birds"?<hr/>:<></>}</li>

        </ul>
    </div>
  )
}

export default Navbar