import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState('');
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const { data, error } = await 
    supabase.auth.signUp({
      email: formData.get('email'),
      password: formData.get('password')
    })
    if (error) {
      setError(error.toString());
      console.warn(error);
    } else {
      setSession(data.session);
      const { UserData, UserError } = await supabase
        .from('users')
        .insert([
          { 
            auth_user_id: data.session.user.id,
            first_name: formData.get('first_name'),
            last_name: formData.get('last_name')
          }
        ]);
      setLoading(false);
      navigate('/profile');
    }

  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>First name</label>
        <input id="first_name" name="first_name" type="text" /><br />
        <label>Last name</label>
        <input id="last_name" name="last_name" type="text" /><br />
        <label>E-mail</label>
        <input id="email" name="email" type="email" /><br />
        <label>Password</label>
        <input id="password" name="password" type="password" /><br />
        <input type="submit" value="submit"></input>
      </form>
      {error}
    </>
  );
}
