import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Profile({session, profile}) {
  const navigate = useNavigate();

  const handleLogout = async (event) => {
    event.preventDefault();

    const { error } = await
    supabase.auth.signOut()
    navigate('/');
  }

  console.log(session)
  console.log(profile)

  // const date = new Date(session?.user?.last_sign_in_at || '')
  // const date = new Date(session?.user?.last_sign_in_at || '').toISOString().split('T')[0];

  return (
    <>
      <h1>Profile</h1>
      <p>name: {profile?.first_name} {profile?.last_name}</p>
      <p>email: {session?.user?.email}</p>
      <p>last sign in at: {session?.user?.last_sign_in_at}</p>
      <a href="#" onClick={handleLogout}>Sair</a>
    </>
  );
}
