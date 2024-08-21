import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { UserContext } from '../context/context';

interface ProtectedRouteProps {
  element: React.ReactElement;
  hasPermission: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, hasPermission }) => {

  const {setPermission} = useContext(UserContext)
  const [load, setLoad] = useState(false)
 

  return (hasPermission) ? element : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;
