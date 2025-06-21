import React from 'react'
import { Navigate } from 'react-router';

export const ProtectedRoute = ({isLoginPage = false, children}) => {
  // const token = document.cookie.split('; ').find(row => row.startsWith('authToken='));
  const token = localStorage.getItem('authToken');
  const isAuthenticated = !!token;
  
  switch (isLoginPage) {
    case true:
      if (isAuthenticated) return <Navigate to="/" replace />;
      if (!isAuthenticated) return children;
      break;
    case false:
      if (isAuthenticated) return children;
      if (!isAuthenticated) return <Navigate to="/login" replace />;
      break;
    default:
      return <Navigate to="/login" replace />;
  }
}
