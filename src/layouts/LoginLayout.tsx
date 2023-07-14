import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';

const LoginLayout = ({ children }) => {
  return (
    <>
      {children}
      <Outlet />
    </>
  );
};

export default LoginLayout;
