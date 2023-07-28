import { FC } from 'react'
import { Outlet } from 'react-router-dom';

export const LoginLayout:FC = () => {

  return (
    <>
      <Outlet />
    </>
  )
}