import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';

import { AuthProvider, RequireAuth } from './auth';

import { BaseLayout } from './layouts/DefaultLayout.tsx';
import { LoginLayout } from './layouts/LoginLayout';
import HomeLayout from './layouts/HomeLayout';

import { useAuth } from './hooks.ts';

import Home from './pages/Home.tsx'
import SignIn from './pages/SignIn.tsx'
import SignUp from './pages/SignUp.tsx'
import Profile from './pages/Profile.tsx'
import Sectors from './pages/sectors/Sectors.tsx'
import SingleSector from './pages/sectors/SingleSector.tsx'
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
          <Route element={<HomeLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<BaseLayout />}>
            <Route path="/conquistadores" element={<Conquerors />} />
            <Route path="/conquistadores/adicionar" element={
              <RequireAuth>
                <AddConquerors />
              </RequireAuth>
              }
            />
            <Route path="/setores" element={<Sectors />} />
            <Route path="/setores/:slug" element={<SingleSector />} />
            <Route path="/setores/adicionar" element={
              <RequireAuth>
                <AddSectors />
              </RequireAuth>
              }
            />
            <Route path="/perfil" element={<Profile />} />
          </Route>
          <Route element={<LoginLayout />}>
            <Route path="/entrar" element={<SignIn />} />
            <Route path="/cadastrar" element={<SignUp />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
