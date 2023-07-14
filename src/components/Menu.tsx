import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { supabase } from '../supabaseClient';

export default function Menu({ session, profile }) {

  const handleLogout = async (event) => {
    event.preventDefault();

    const { error } = await
    supabase.auth.signOut()
    navigate('/');
  }

  return (
    <>
      <ul>
        <li><a href="/sectors">Setores</a></li>
        <li><a href="/sectors/add">Adicionar Setores</a></li>
        { profile ?
          <li>
            <a href="/profile">{profile?.first_name} {profile?.last_name} </a> 
            (<a onClick={handleLogout} href="#">sair</a>)
          </li>
          : 
          <li><a href="/signin">Entrar</a> / <a href="/signup">Criar uma conta</a></li>}
      </ul>
    </>
  )
}
