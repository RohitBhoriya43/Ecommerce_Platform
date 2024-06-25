import React,{useState,useEffect} from "react";
import axios from "axios"
import {useParams} from "react-router-dom"
import {useAuth} from "../../context/AuthContext"

export default function EditProduct() {
    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const [price,setPrice] = useState("")
    const [product,setProduct] = useState(null)
    const {findHeaders} =useAuth()
    let params = useParams()

    console.log("datrasdfhgbvgfgfff")
  

  const onSubmit = async (e) => {
    
    e.preventDefault();
    console.log("findHeaders",findHeaders())
    try {
      if (product) {
       
        const {data} = await axios.put(`http://127.0.0.1:4000/api/v1/products/${product.id}`, {name,price:Number(price),description},findHeaders());
        console.log("update product",data)
    } 
    } catch (error) {
      console.error('Product form error', error);
    }
  };

  const fetchProduct=async()=>{
    try{
        let {data} = await axios.get(`http://127.0.0.1:4000/api/v1/products/${params.id}`,findHeaders());
        console.log( "product fetch in id",data)
        setProduct(data.data)
        setName(data.data.name)
        setDescription(data.data.description)
        setPrice(data.data.price)
        }catch(err){
          console.log( "product fetch in id",err)
        }
  }

  useEffect(()=>{
      fetchProduct()
  },[])



  return (
    <div className="container mx-auto p-4">
        <h1 className="text-2xl mb-4">Edit Product</h1>
        <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <div className="mb-4">
            <label className="block text-gray-700">Product Name</label>
            <input className="w-full p-2 border rounded" type="text" value={name?name:""} onChange={(e)=>setName(e.target.value)} required />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700">Product Description</label>
            <textarea className="w-full p-2 border rounded" value={description?description:""} onChange={(e)=>setDescription(e.target.value)} required></textarea>
        </div>
        <div className="mb-4">
            <label className="block text-gray-700">Product Price</label>
            <input  className="w-full p-2 border rounded" type="number" step="any" value={price?price:""} onChange={(e)=>setPrice(e.target.value)} required />
        </div>
        <button className="w-full bg-blue-500 text-white py-2 rounded">Save</button>
        </form>
    </div>
  );
}
