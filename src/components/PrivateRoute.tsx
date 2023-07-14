import React from 'react';
import { Route, Navigate } from 'react-router-dom';

import { supabase } from '../supabaseClient';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(( { data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  });

  const { user } = session;
  console.log(user);

  return (
    <Route
      {...rest}
      element={user ? <Element /> : <Navigate to="/login" />}
    />
  );
}

export default PrivateRoute;
