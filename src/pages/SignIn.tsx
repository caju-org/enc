import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState('');
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const { data, error } = await 
    supabase.auth.signInWithPassword({
      email: formData.get('email'),
      password: formData.get('password')
    })
    if (error) {
      setError(error.toString());
      console.warn(error);
    } else {
      setSession(data.session);
      setLoading(false);
      navigate('/profile');
    }

  };

  return (
    <>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label>E-mail</label>
        <input id="email" name="email" type="text" />
        <label>Password</label>
        <input id="password" name="password" type="password" />
        <input type="submit" value="submit"></input>
      </form>
      {error}
    </>
  );
}
