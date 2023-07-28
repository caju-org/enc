import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const AddSectorsPage = () => {
  const [loading, setLoading] = useState(false);
  // const [session, setSession] = useState('');
  // const [error, setError] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    // add try / catch
    const { data, error } = await 
    supabase.from('sectors').insert([{
      name: formData.get('name'),
      city: formData.get('city'),
      state: formData.get('state'),
      description: formData.get('description'),
      how_to_get_there: formData.get('how_to_get_there')
    }])
    if (error) {
      // setError(error.toString());
      console.warn(error);
    } else {
      console.log(data);
      setLoading(false);
      navigate('/sectors');
    }

  };


  return (
    <>
      <h1>Adicionar Setores</h1>
      { loading ?? <span>loading...</span> }
      <form onSubmit={handleSubmit}>
        <label>Nome do Setor</label>
        <input id="name" name="name" type="text" /><br />
        <label>Cidade</label>
        <input id="city" name="city" type="text" /><br />
        <label>Estado</label>
        <input id="state" name="state" type="text" /><br />
        <label>Descrição</label>
        <input id="description" name="description" type="text" /><br />
        <label>Como chegar</label>
        <input id="how_to_get_there" name="how_to_get_there" type="text" /><br />

        <input type="submit" value="submit"></input>
      </form>
      {/* {error.message} */}

    </>
  )
}

export default AddSectorsPage;
