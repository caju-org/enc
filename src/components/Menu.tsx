import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';

export default function Menu() {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.session) {
    auth.getSession();
  }

  if (!auth.profile && Boolean(auth?.session)) {
    auth.getProfile(auth.session.user.id);
  }

  const handleLogout = async (event: React.MouseEvent) => {
    event.preventDefault();
    auth.signout(() => navigate("/"));
  }

  return (
    <>
      <ul>
        <li><Link to="/sectors">Setores</Link></li>
        <li><Link to="/sectors/add">Adicionar Setores</Link></li>
        <li><Link to="/conquerors">Conquistadores</Link></li>
        <li><Link to="/conquerors/add">Adicionar Conquistadores</Link></li>
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
