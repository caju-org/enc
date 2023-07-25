import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';

export default function Menu() {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.session) {
    auth.getSession();
  }

  if (!auth.profile && Boolean(auth?.session)) {
    auth.getProfile(auth.session.user.id, () => {})
  }

  const handleLogout = async (event) => {
    event.preventDefault();
    auth.signout(() => navigate("/"));
  }

  return (
    <>
      <ul>
        <li><Link to="/sectors">Setores</Link></li>
        <li><Link to="/sectors/add">Adicionar Setores</Link></li>
        { auth.session?.user ?
          <li>
            <Link to="/profile">{auth.profile?.first_name} {auth.profile?.last_name} </Link>
            (<Link onClick={handleLogout} to="/signout">sair</Link>)
          </li>
          : 
          <li><Link to="/signin">Entrar</Link> / <Link to="/signup">Criar uma conta</Link></li>}
      </ul>
    </>
  )
}
