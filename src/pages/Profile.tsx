import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';

export default function Profile() {
  const auth = useAuth();
  const navigate = useNavigate();

  const date = new Date(auth.session?.user?.last_sign_in_at || '').toISOString().split('T')[0];

  return (
    <>
      <h1>Profile</h1>
      <p>name: {auth.profile?.first_name} {auth.profile?.last_name}</p>
      <p>email: {auth.session?.user?.email}</p>
      <p>last sign in at: {auth.session?.user?.last_sign_in_at}</p>
    </>
  );
}
