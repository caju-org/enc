import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';

import { AuthProvider, RequireAuth } from './auth';

import { BaseLayout } from './layouts/BaseLayout';
import { LoginLayout } from './layouts/LoginLayout';

import { useAuth } from './hooks.ts';

import Home from './pages/Home.tsx'
import SignIn from './pages/SignIn.tsx'
import SignUp from './pages/SignUp.tsx'
import Profile from './pages/Profile.tsx'
import Sectors from './pages/Sectors.tsx'
import AddSectors from './pages/AddSectors.tsx'
import Conquerors from './pages/Conquerors.tsx'
import AddConquerors from './pages/AddConquerors.tsx'

function App() {
  const auth = useAuth();

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
            <Route path="/conquerors" element={<Conquerors />} />
            <Route path="/conquerors/add" element={
              <RequireAuth>
                <AddConquerors />
              </RequireAuth>
              }
            />
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
}

export default App
