import { useAuth } from '../hooks';

export default function Profile() {
  const auth = useAuth();

  return (
    <>
      <h1>Perfil</h1>
      <p>nome: {auth.profile?.first_name} {auth.profile?.last_name}</p>
      { auth.profile?.is_conqueror == true ?
        <p>é moderador? sim</p>
        : null
      }
      <p>email: {auth.session?.user?.email}</p>
      <p>criado em: {auth.session?.user?.created_at}</p>
    </>
  );
}
