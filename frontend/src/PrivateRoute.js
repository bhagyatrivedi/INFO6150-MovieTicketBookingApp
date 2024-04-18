import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Adjust the import path as necessary

/**
 * PrivateRoute checks user's authentication and authorization to access certain routes.
 * 
 * @param {{ children: JSX.Element, allowedTypes: string[] }} props 
 * @returns JSX.Element
 */
const PrivateRoute = ({ children, allowedTypes }) => {
  const { user } = useContext(AuthContext);

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Redirect to home if the user type is not allowed for this route
  if (allowedTypes && allowedTypes.length > 0 && !allowedTypes.includes(user.type)) {
    return <Navigate to="/" />;
  }

  return children;
};
