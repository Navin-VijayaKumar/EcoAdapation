import React, { useState } from 'react';
import './AddProduct.css';
import up from './Assets/up.png'

const AddProduct = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: null,
    category: "Select State",
    new_price: "",
    old_price: "",
  });
  // id: 2,
  //   name: "dog",
  //   category: "dog",
  //   image: ad1,
  //   age: "2",
  //   address: "abc",
  //   state: "Kerala",
  //   PhoneNumber: "000000000000",
  //   Email: "sample@gmail.com",
  //   District: "Palakkad",

  const changeHandler = (e) => {
    if (e.target.name === "image") {
      setProductDetails({ ...productDetails, image: e.target.files[0] }); // Store the selected file
    } else {
      setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    }
  };

  const Add_Product = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;
    let formData = new FormData();
    formData.append('product', product.image); // Append the image file

    await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    })
    .then((resp) => resp.json())
    .then((data) => { responseData = data });
    
    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);
      await fetch('http://localhost:4000/addproduct',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',

        },
        body:JSON.stringify(product),
      }).then((resp)=>resp.json()).then((data)=>
      {
        data.success?alert("product added"):alert("failed")
      
      })
    }
  };

  return (
    <div className="addproduct">
      <div className="addproduct-items">
  
      
        <div className="addproduct-field">
          <p>Pet ID</p>
          <input
            value={productDetails.id}
            onChange={changeHandler}
            type="text"
            name="id"
            placeholder="Enter ID"
          />
        </div>
  
        <div className="addproduct-field">
          <p>Pet Name</p>
          <input
            value={productDetails.name}
            onChange={changeHandler}
            type="text"
            name="name"
            placeholder="Enter Name"
          />
        </div>
  
        <div className="addproduct-field">
          <p>Age</p>
          <input
            value={productDetails.age}
            onChange={changeHandler}
            type="text"
            name="age"
            placeholder="Enter Age"
          />
        </div>
  
        <div className="addproduct-field">
          <p>Address</p>
          <input
            value={productDetails.address}
            onChange={changeHandler}
            type="text"
            name="address"
            placeholder="Enter Address"
          />
        </div>
  
        
        <div className="addproduct-field addproduct-category">
          <p>State</p>
          <select
            value={productDetails.category}
            onChange={changeHandler}
            name="category"
            className="selector"
          >
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Kerala">Kerala</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="West Bengal">West Bengal</option>

          </select>
        </div>
  
        
        <div className="addproduct-field">
          <p>Phone Number</p>
          <input
            value={productDetails.PhoneNumber}
            onChange={changeHandler}
            type="text"
            name="PhoneNumber"
            placeholder="Enter Phone Number"
          />
        </div>
  
        <div className="addproduct-field">
          <p>Email</p>
          <input
            value={productDetails.Email}
            onChange={changeHandler}
            type="text"
            name="Email"
            placeholder="Enter Email"
          />
        </div>
  
        <div className="addproduct-field">
          <p>District</p>
          <input
            value={productDetails.District}
            onChange={changeHandler}
            type="text"
            name="District"
            placeholder="Enter District"
          />
        </div>
  
        {/* Image Upload */}
        <div className="addproduct-field addproduct-image">
          <label htmlFor="file-input">
          <p>Upload Pet Image</p>
            <img src={up} className="imaged" alt="upload" />
          </label>
          <input
            onChange={changeHandler}
            type="file"
            name="image"
            id="file-input"
            hidden
          />
        </div>
  
        {/* Submit Button */}
        <button onClick={Add_Product} className="addproduct-button">
          Add
        </button>
      </div>
    </div>
  );
  
};

export default AddProduct;
