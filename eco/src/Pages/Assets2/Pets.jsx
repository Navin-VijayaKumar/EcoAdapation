import React, { useContext } from "react";
import { PetContext } from "../../PetContext/PetContextProvider";
import { useParams } from "react-router-dom";
import InnerDisplay from "../../Components/InnerDisplay/InnerDisplay";

const Pets = () => {
  const { all_product } = useContext(PetContext); // Changed to all_product
  const { productID } = useParams();

  // Log all_product and productID for debugging
  console.log("All products data:", all_product);
  console.log("Product ID from params:", productID);

  // Ensure productID is a number and find the corresponding product
  const product = all_product?.find((e) => e.id === Number(productID)); // Changed to all_product

  // Log the selected product for debugging
  console.log("Selected product:", product);

  // Check if data is still loading or product not found
  if (!all_product) {
    return <p>Loading data...</p>;  // Data is still being fetched
  }

  if (!product) {
    return <p>Product not found or invalid product ID...</p>;  // Product ID does not match any product
  }

  return (
    <>
      <InnerDisplay product={product} />
    </>
  );
};

export default Pets;
