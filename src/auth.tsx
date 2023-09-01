import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { useAuth } from './hooks';

type Credential = {email: FormDataEntryValue, password: FormDataEntryValue}

interface AuthContextType {
  session: any;
  profile: any;
  getSession: ( callback?: VoidFunction ) => void;
  getProfile: ( auth_user_id: string, callback?: VoidFunction ) => void;
  signin: ( credential: Credential, callback?: VoidFunction ) => void;
  signout: ( callback?: VoidFunction ) => void;
}

const AuthContext = React.createContext<AuthContextType>(null as unknown as AuthContextType);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  const getSession = async (callback?: VoidFunction) => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.warn(error);
    } else {
      const session = data.session;
      setSession(session);
    }
    callback?.();
  }

  const getProfile = async (user_id: string, callback?: VoidFunction) => {
    const { data, error } = await supabase
      .from('profiles')
      .select(`name,is_conqueror,is_partner,city_id,
        states(name,id),
        cities(name)`)
      .eq('id', user_id.toString())
      .single();
    if (error) {
      console.warn(error);
    } else {
      setProfile(data);
    }
    callback?.();
  }

  const signin = async (credential: Credential, callback?: VoidFunction) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credential.email.toString(),
      password: credential.password.toString()
    })
    if (error) {
      alert(error);
    } else {
      const session = data.session;
      setSession(session);
      callback?.();
    }
  }

  const signout = async (callback?: VoidFunction) => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.warn(error);
    }
    setSession(null);
    setProfile(null);
    callback?.();
  }

  const value = { session, profile, getSession, getProfile, signin, signout }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )

}

function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.session) {
    auth.getSession();
  }

  if (!auth.session) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}

export { AuthProvider, RequireAuth, AuthContext };
