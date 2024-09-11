import React, { useContext } from "react";
import { PetContext } from "../../PetContext/PetContextProvider";
import { useParams } from "react-router-dom";
import InnerDisplay from "../../Components/InnerDisplay/InnerDisplay";

const Pets = () => {
  const { all_pet } = useContext(PetContext);
  const { productID } = useParams();

  // Log all_pet and productID for debugging
  console.log("All pets data:", all_pet);
  console.log("Product ID from params:", productID);

  // Ensure productID is a number and find the corresponding product
  const product = all_pet?.find((e) => e.id === Number(productID));

  // Log the selected product for debugging
  console.log("Selected product:", product);

  // Check if data is still loading or product not found
  if (!all_pet) {
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
