import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const AddConquerorsPage = () => {
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    // add try / catch
    const { data, error } = await 
    supabase.from('conquerors').insert([{
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
    }])
    if (error) {
      // setError(error.toString());
      console.warn(error);
    } else {
      console.log(data);
      setLoading(false);
      navigate('/conquerors');
    }

  };


  return (
    <>
      <h1>Adicionar Conquistador</h1>
      { loading ?? <span>loading...</span> }
      <form onSubmit={handleSubmit}>
        <label>Primeiro nome do conquistador</label>
        <input id="first_name" name="first_name" type="text" /><br />
        <label>Último nome</label>
        <input id="last_name" name="last_name" type="text" /><br />

        <input type="submit" value="submit"></input>
      </form>
      {/* {error.message} */}

    </>
  )
}

export default AddConquerorsPage;
