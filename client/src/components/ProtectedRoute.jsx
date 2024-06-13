import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, requiredRole, element }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
