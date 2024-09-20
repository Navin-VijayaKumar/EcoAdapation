import React from 'react';
import './Admin.css';
import Slider from '../../Components/Navbar/Slider/Slider';
import { Routes, Route } from 'react-router-dom';
import Addproduct from '../../Components/Addproduct/Addproduct';
import Removeproduct from '../../Components/Removeproduct/Removeproduct';

const Admin = () => {
  return (
    <div className='admin'>
      <Slider/>
      <Routes>
        <Route path="/addproduct" element={<Addproduct />} />
        <Route path="/listproduct" element={<Removeproduct />} />
      </Routes>
    </div>
  );
};

export default Admin;
