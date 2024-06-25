

import axios from 'axios';
import  React, { useEffect, useState } from 'react';
import './productlist.css'
import {useAuth} from "../../context/AuthContext"
import {useNavigate,Link} from "react-router-dom"

export default function ProductList() {
  const [products, setProducts] = useState([
    {
        id:1,
        name:"Samsung S21 FE",
        description:"asdashfdhfdhhfd",
        price:23444.99
    },
    {
        id:2,
        name:"Samsung S21 FE",
        description:"asdashfdhfdhhfd",
        price:23444.99
    },
    {
        id:3,
        name:"Samsung S21 FE",
        description:"asdashfdhfdhhfd",
        price:23444.99
    },
  ]);
  const [foundProduct,setFoundProduct] = useState(false)

  const {user,findHeaders} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
        try{
      const res = await axios.get('http://127.0.0.1:4000/api/v1/products/getAll',findHeaders());
      console.log("get product",res)
      setProducts(res.data.data);
        }catch(err){

        }
    };

    fetchProducts();
  }, []);

  const editProduct=(id)=>{
    navigate(`/products/edit/${id}`)
  }

  const orderProduct=async(product)=>{
    try{
      let data={
        products:[{
          productId:product.id,
          price:product.price,
          quantity:1
        }]
      }
      const res = await axios.post('http://127.0.0.1:4000/api/v1/order/create',data,findHeaders());
      console.log("order create",res)
      
        }catch(err){

        }
  }

  return (
    
      <div className="container mx-auto p-4">
        <h1 className="text-2xl mb-4">Products</h1>
        <ul className="product-list">
          {!foundProduct && products.map((product) => (
            <li key={product.id} className='.product-item'>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>Price: &#8377; {product.price}</p>
                {user.roles[0] !=="customer"?(<Link to={`/products/edit/${product.id}`} className= "mr-4">Edit Product</Link>):""}
                
                <button onClick={()=>orderProduct(product)} className="mr-4">Order Product</button>
            </li>
          ))}
        </ul>
      </div>
  );
}
