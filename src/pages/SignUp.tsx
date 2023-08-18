import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import Typography  from '@mui/joy/Typography';

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  // const [session, setSession] = useState('');
  // const [error, setError] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const { data, error } = await 
    supabase.auth.signUp({
      email: formData.get('email')?.toString() || "",
      password: formData.get('password')?.toString() || ""
    })
    if (error) {
      // setError(error.toString());
      console.warn(error);
    } else {
      console.log(data);
      // setSession(data.session);
    //   await supabase
    //     .from('profiles')
    //     .insert([
    //       { 
    //         auth_user_id: data?.session?.user.id,
    //         first_name: formData.get('first_name'),
    //         last_name: formData.get('last_name'),
    //         is_conqueror: formData.get('is_conqueror')
    //       }
    //     ]);
    //  if (formData.get('is_conqueror')) {
    //    console.log("the user is also a conqueror, saving");
    //    await supabase
    //     .from('conquerors')
    //     .insert([
    //       {
    //         first_name: formData.get('first_name'),
    //         last_name: formData.get('last_name'),
    //       }
    //     ]);
    //  } else {
    //   console.log("nothing to do here");
    //  }
     setLoading(false);
     navigate('/');
    }
  };

  return (
    <>
      { loading ?? <span>loading...</span> }
      <Typography component="h1" fontSize="xl2" fontWeight="lg">Crie uma conta</Typography>
      <form onSubmit={handleSubmit}>
        <FormControl required>
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" />
        </FormControl>
        <FormControl required>
          <FormLabel>Senha</FormLabel>
          <Input type="password" name="password" />
        </FormControl>
        <Button type="submit" fullWidth>
          Criar conta 
        </Button>
      </form>
      <Link fontSize="sm" href="/signin" fontWeight="lg">
        Já tem conta? Acesse agora.
      </Link>
    </>
  );
}