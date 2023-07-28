import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks';

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();

  const auth = useAuth();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const email = formData.get("email") || "";
    const password = formData.get("password") || "";
    const credential = {
      email, password
    };

    auth.signin(credential, () => {
      navigate(from, { replace: true });
    })
  };

  return (
    <>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label>E-mail</label>
        <input id="email" name="email" type="text" /><br />
        <label>Password</label>
        <input id="password" name="password" type="password" />
        <input type="submit" value="submit"></input>
      </form>
    </>
  );
}
