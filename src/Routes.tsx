import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import { supabase } from './supabaseClient';

// import PrivateRoute from './components/PrivateRoute.tsx'
import Menu from './components/Menu.tsx'

import Home from './pages/Home.tsx'
import SignIn from './pages/SignIn.tsx'
import SignUp from './pages/SignUp.tsx'
import Profile from './pages/Profile.tsx'
import Sectors from './pages/Sectors.tsx'
import AddSectors from './pages/AddSectors.tsx'

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(( { data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  })

  return (
    <>
      {!session ? <Menu session={{}} /> : <Menu session={session} />}
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="signin" element={<SignIn session={session} />}></Route>
          <Route path="signup" element={<SignUp />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="sectors" element={<Sectors />}>
            <Route exact path="add" element={<AddSectors />}></Route>
          </Route>
        </Route>
      </Routes>
      <Typography>
        footer
      </Typography>
    </>
  )
}

export default App
