import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import { supabase } from './supabaseClient';

import { AuthProvider, RequireAuth, useAuth } from './auth';

import BaseLayout from './layouts/BaseLayout';
import LoginLayout from './layouts/LoginLayout';

// import PrivateRoute from './components/PrivateRoute.tsx'

import Home from './pages/Home.tsx'
import SignIn from './pages/SignIn.tsx'
import SignUp from './pages/SignUp.tsx'
import Profile from './pages/Profile.tsx'
import Sectors from './pages/Sectors.tsx'
import AddSectors from './pages/AddSectors.tsx'

function App() {
  let auth = useAuth();

  useEffect(() => {
    if (!auth?.session) {
      auth?.getSession()
    } else {
      console.log("nothing to do here");
    }
  })

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route path="/" element={<Home/>} />
            <Route path="/sectors" element={<Sectors />} />
            <Route path="/sectors/add" element={
              <RequireAuth>
                <AddSectors />
              </RequireAuth>
              }
            />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<LoginLayout />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  )
};

export default App
