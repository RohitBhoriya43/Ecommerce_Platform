// src/components/ProtectedRoute.js
import React from 'react';
import { Route, Navigate,Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({roles,...props}) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.roles[0])) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
    
};

export default ProtectedRoute;
