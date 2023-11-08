import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import Loader from '../layout/loader/loader';

const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      {!loading && (isAuthenticated === false || isAuthenticated === true) ? (
        isAuthenticated === false ? (
          <>
            <Navigate to="/login"></Navigate>
          </>
        ) : (
          <>
            <Outlet />
          </>
        )
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProtectedRoute;
