"use client";

import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import {useAuth} from '../../context/AuthContext';

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const { user,findHeaders } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
    try{
    let url = user.roles[0] === 'customer'?'http://127.0.0.1:4000/api/v1/order/user/get':'http://127.0.0.1:4000/api/v1/order/getAll'
      const res = await axios.get(url,findHeaders())
      console.log("orders",res)
      setOrders(res.data.data);
    }catch(err){
        console.log("orders err",err)
    }
    };

    fetchOrders();
  }, [user]);

  return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl mb-4">Orders</h1>
        <ul className="list-disc pl-5">
          {user.roles[0] === 'customer'?orders.map((order,index) => (
            <li key={order.id} className="mb-5">
            <div>
                <h1>Order #{index+1}</h1>
            </div>
              
              <h2>Product Name: {order.product.name}</h2>
              <p>Product Description: {order.product.description}</p>
              <p>order Price: &#8377; {order.total}</p>
              <p>Status: Inprogress</p>
            </li>
          )):orders.map((order,index) => (
            <li key={order.id}>
            <div>
                <h1>Order #{index+1}</h1>
            </div>
            <div>
                <h1>User Name : {order.user.username}</h1>
            </div>
              
              <h2>Product Name: {order.product.name}</h2>
              <p>Product Description: {order.product.description}</p>
              <p>order Price: &#8377; {order.total}</p>
              <p>Status: Inprogress</p>
            </li>))}
        </ul>
      </div>
  );
}
