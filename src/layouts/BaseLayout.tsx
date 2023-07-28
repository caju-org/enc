import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Menu from '../components/Menu.tsx';

export const BaseLayout:FC = () => {

  return (
    <>
      <header>header</header>
      <Menu />
      <Outlet />
      <footer>footer</footer>
    </>
  )
}