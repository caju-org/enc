import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';

export default function Profile() {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <h1>Profile</h1>
      <p>name: {auth.profile?.first_name} {auth.profile?.last_name}</p>
      { auth.profile?.is_conqueror == true ?
        <p>é moderador? sim</p>
        : null
      }
      <p>email: {auth.session?.user?.email}</p>
      <p>created at: {auth.session?.user?.created_at}</p>
    </>
  );
}
