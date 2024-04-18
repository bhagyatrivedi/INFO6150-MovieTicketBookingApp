import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // User not authenticated, redirect to login
    return <Navigate to="/login" />;
  }

  return children;
};
