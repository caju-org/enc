import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { supabase } from '../supabaseClient';

import Menu from '../components/Menu.tsx';

function BaseLayout({children, session, profile}) {

  return (
    <>
      <header>header</header>
      {!session ? <Menu session={{}} /> : <Menu session={session} profile={profile} />}
      {children}
      <Outlet />
      <footer>footer</footer>
    </>
  )
}

export default BaseLayout;
