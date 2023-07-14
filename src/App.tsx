import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import { supabase } from './supabaseClient';

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
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(null)

  useEffect(() => {
    if (!session) {
      supabase.auth.getSession().then(( { data: { session } }) => {
        setSession(session)
      })

      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
    }
  })

  useEffect(() => {
    if (!profile && Boolean(session)) {
      async function getProfile() {
        setLoading(true);
        const { user } = session;
        let { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('auth_user_id', user.id)
          .single()
        if (error) {
          console.warn(error);
        } else {
          setProfile(data)
          console.log(data);
        }
      }
        setLoading(false);
        getProfile();
    }
  }, [session])

  return (
    <>
      <Routes>
        <Route element={<BaseLayout session={session} profile={profile} />}>
          <Route path="/" element={<Home/>} />
          <Route path="/sectors" element={<Sectors />} />
          <Route path="/sectors/add" element={<AddSectors />} />
          <Route path="/profile" element={<Profile session={session} profile={profile} />} />
        </Route>
        <Route element={<LoginLayout />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </>
  )
};

export default App
