import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks';

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

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
    <Typography component="h1" fontSize="xl2" fontWeight="lg">
      Acesse sua conta
    </Typography>
    <form onSubmit={handleSubmit}>
      <FormControl required>
        <FormLabel>Email</FormLabel>
        <Input type="email" name="email" />
      </FormControl>
      <FormControl required>
        <FormLabel>Senha</FormLabel>
        <Input type="password" name="password" />
      </FormControl>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        >
          <Checkbox size="sm" label="Lembre de mim por 30 dias" name="persistent" />
          <Link fontSize="sm" href="#replace-with-a-link" fontWeight="lg">
            Esqueceu a senha?
          </Link>
        </Box>
        <Button type="submit" fullWidth>
          Acessar
        </Button>
      </form>
      {/* <Button
        variant="outlined"
        color="neutral"
        fullWidth
        startDecorator={<></>}
      >
        Acessar com o Google 
      </Button> */}
      <Link fontSize="sm" href="/cadastrar" fontWeight="lg">
        Ainda não tem uma conta? Crie uma agora.
      </Link>
    </>
  );
}
