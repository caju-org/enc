import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();

  if (!auth.user) {
    return <Navigate to="/sigin" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
