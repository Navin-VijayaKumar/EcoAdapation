import React from 'react'
import AddProduct from '../../../../adminPanel/Components/Addproduct/Addproduct'
import bgea3 from '../Assets2/asserts/bgea3.jpg'
const Save_me = () => {
  return (
    <div className="save-all" style={{ backgroundImage: `url(${bgea3})` }}>
    <AddProduct />
  </div>
  )
}

export default Save_me