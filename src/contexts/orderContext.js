import React, { createContext, useState, useContext } from "react";
import axios from "axios";


import { BASE_URL } from "../config/env";

const API_URL = BASE_URL + "/api/order";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userOrders, setUserOrders] = useState([]);

 
  const getOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/all`);

      const orders = response.data;
      orders.sort((a, b) => new Date(b.date) - new Date(a.date));
      setOrders(orders);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserOrders = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/user/${id}`);

      const orders = response.data;
      //sort by date latest first
      orders.sort((a, b) => new Date(b.date) - new Date(a.date));
      setUserOrders(orders);
    } catch (error) {
      console.log(error);
    }
  };

  const createOrder = async (order) => {
    const { products, total, user, quantity, color, size, status } = order;
    try {
      const config = {
        method: "post",
        url: `${API_URL}/create`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          products,
          total,
          user,
          quantity,
          color,
          size,
          status,
        }),
      };

      const response = await axios(config);

      if(response.data){
        alert("Order Created Successfully");
        return response.data;
      }

     
    } catch (error) {
      console.log("CREATE ORDER ERR: ",error);
      alert("Order Creation Failed");
    }
  };

  const updateOrder = async (order) => {
    let id = order._id;
    let total = order.total;
    let user = order.user._id;
    let products = order.products._id;
    let quantity = order.quantity;
    let color = order.color;
    let size = order.size;
    let status = order.status;

    console.log(products, total, user, quantity, color, size, status);

    try {
      const config = {
        method: "put",
        url: `${API_URL}/update/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          products,
          total,
          user,
          quantity,
          color,
          size,
          status,
        }),
      };

      const response = await axios(config);

      console.log(response.data);
      alert("Order Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };



  const getOrder = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      console.log(response.data);
      setOrder(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <OrderContext.Provider
      value={{ orders, getOrders, createOrder, getUserOrders, updateOrder, userOrders }}
    >
      {children}
    </OrderContext.Provider>
  );
};
