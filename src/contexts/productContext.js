//product context
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

import { BASE_URL } from "../config/env";

export const ProductContext = createContext();
const API_URL = BASE_URL + "/api/product";

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/all`);
      const filteredProducts = response.data.filter(
        (product) => product.visible === true
      );
      setProducts(filteredProducts);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [product]);

  const getProduct = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);

      setProduct(response.data);
    } catch (error) {
      console.log("GET PRODUCT ERR", error);
    }
  };

  const addProduct = async (name, price, description, image) => {
    try {
      const response = await axios.post(`${API_URL}/create`, {
        name,
        price,
        description,
        image,
      });
      console.log(response.data);
      alert("Product Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async (productData) => {
    const {
      _id,
      product_name,
      product_price,
      product_description,
      product_image,
      product_category,
      product_quantity,
      user,
      visible,
      moq,
    } = productData;
    console.log("UPDATE PRODUCT", productData);

    try {
      const config = {
        method: "put",
        url: `${API_URL}/update/${_id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          product_name,
          product_price,
          product_description,
          product_image,
          product_category,
          product_quantity,
          user,
          visible,
          moq,
        }),
      };
      const response = await axios(config);
      console.log("UPDATE PROD data", response.data);

      return response.data;
    } catch (error) {
      console.log("UPDATE PRODUCT ERR: ", error);
      alert("Product Update Failed");
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/delete/${id}`);
      console.log(response.data);
      alert("Product Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        product,
        loading,
        getProduct,
        addProduct,
        updateProduct,
        deleteProduct,
        getProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
