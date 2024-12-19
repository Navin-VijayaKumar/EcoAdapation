import React, { useState } from 'react';
import './Addproduct.css';
import up from './Assets/up.png';

const AddProduct = () => {
  const [productDetails, setProductDetails] = useState({
    id: "",
    name: "",
    image: null,
    category: "",
    age: "",
    address: "",
    state: "",
    PhoneNumber: "",
    Email: "",
    District: "",
  });

  const [isLoading, setIsLoading] = useState(false); // For button state

  const changeHandler = (e) => {
    if (e.target.name === "image") {
      setProductDetails({ ...productDetails, image: e.target.files[0] });
    } else {
      setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    }
  };

  const Add_Product = async () => {
    if (!productDetails.name || !productDetails.image || !productDetails.category) {
      alert("Please fill all required fields.");
      return;
    }

    setIsLoading(true); // Disable button while processing
    let responseData;
    let formData = new FormData();

    formData.append('image', productDetails.image);
    formData.append('id', productDetails.id);
    formData.append('name', productDetails.name);
    formData.append('category', productDetails.category);
    formData.append('age', productDetails.age);
    formData.append('address', productDetails.address);
    formData.append('state', productDetails.state);
    formData.append('PhoneNumber', productDetails.PhoneNumber);
    formData.append('Email', productDetails.Email);
    formData.append('District', productDetails.District);

    try {
      const uploadResponse = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData,
      });
      responseData = await uploadResponse.json();

      if (responseData.success) {
        const product = { ...productDetails, image: responseData.image_url };

        const productResponse = await fetch('http://localhost:4000/addproduct', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });

        const result = await productResponse.json();
        if (result.success) {
          alert("Pet Details added successfully");
        } else {
          alert("Failed to add Pet Details");
        }
      } else {
        alert("Failed to upload image");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the pet.");
    } finally {
      setIsLoading(false); 
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
            required
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
            required
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
            required
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
            required
          />
        </div>

        <div className="addproduct-field addproduct-category">
          <p>State</p>
          <select
            value={productDetails.state}
            onChange={changeHandler}
            name="state"
            className="selector"
            required
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

        <div className="addproduct-field addproduct-category">
          <p>Category</p>
          <select
            value={productDetails.category}
            onChange={changeHandler}
            name="category"
            required
            className="selector"
          >
            <option value="">Select Category</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="fish">Fish</option>
            <option value="bird">Bird</option>
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
            required
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
            required
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
            required
          />
        </div>


        <div className="addproduct-field">
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
            required
          />
        </div>

        <div className="down">
        <button
          onClick={Add_Product}
          className="addproduct-button"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add"}
        </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;