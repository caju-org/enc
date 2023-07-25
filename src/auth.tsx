import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from './supabaseClient';

interface AuthContextType {
  session: any;
  profile: any;
  getSession: ( callback: VoidFunction ) => void;
  getProfile: ( auth_user_id: string, callback: VoidFunction ) => void;
  sigin: ( credential: {}, callback: VoidFunction ) => void;
  signout: ( callback: VoidFunction ) => void;
}

const AuthContext = React.createContext<AuthContextType>(null!);

function useAuth() {
  return React.useContext(AuthContext);
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [session, setSession] = React.useState<any>(null);
  let [profile, setProfile] = React.useState<any>(null);

  let getSession = async (callback: VoidFunction) => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.warn(error);
    } else {
      let session = data.session;
      setSession(session);
    }
  }

  let getProfile = async (auth_user_id: string, callback: VoidFunction) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('first_name,last_name')
      .eq('auth_user_id', auth_user_id.toString())
      .single();
    if (error) {
      console.warn(error);
    } else {
      setProfile(data);
    }
    callback();
  }

  let signin = async (credential: {}, callback: VoidFunction) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credential.email,
      password: credential.password
    })
    if (error) {
      alert(error);
    } else {
      let session = data.session;
      setSession(session);
      callback();
    }
  }

  let signout = async (callback: VoidFunction) => {
    let { error } = await supabase.auth.signOut();
    if (error) {
      console.warn(error);
    }
    setSession(null);
    setProfile(null);
    callback();
  }

  let value = { session, profile, getSession, getProfile, signin, signout }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )

}

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.session) {
    auth.getSession();
  }

  if (!auth.session) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}

export { AuthProvider, RequireAuth, useAuth };
