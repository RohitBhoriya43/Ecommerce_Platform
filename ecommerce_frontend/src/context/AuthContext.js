// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
// import jwtDecode from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
    //   const decoded = jwtDecode(token);
    //   setUser(decoded);
      setUser(null);

    }
  }, []);

  const login = async (credentials) => {
    try{
    const { data } = await axios.post('http://127.0.0.1:4000/api/v1/user/login', credentials);
    // const decoded = jwtDecode(data.token);
    setUser(data.data.user);
    console.log("login data",data)
    localStorage.setItem('accessToken', "Bearer "+data.data.accessToken);
    navigate("/dashboard")
    }catch(err){
        console.log("login error",err)
    }
  };

  const register = async (credentials) => {
    const { data } = await axios.post('http://127.0.0.1:4000/api/v1/user/create', credentials);
    // const decoded = jwtDecode(data.token);
    setUser(data.data.user);
    console.log("login data",data)
    localStorage.setItem('accessToken', "Bearer "+data.data.accessToken);
    navigate("/dashboard")
    // const decoded = jwtDecode(data.token);
    // setUser(decoded);
    // localStorage.setItem('token', data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const findHeaders = ()=>{
    let token = localStorage.getItem('accessToken');
    if (token){
      return {
        headers:{
          "content-type":"application/json",
        Authorization:token}
      }
    }
    
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout,findHeaders }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
