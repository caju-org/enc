import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

type Sectors = any[];
type Conquerors = any[];

const AddClimbRoutesPage = () => {
  const [loading, setLoading] = useState(false);
  const [sectors, setSectors] = useState<Sectors>();
  const [conquerors, setConquerors] = useState<Conquerors>();
  // const [error, setError] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const sectorsResponse = await supabase
        .from('sectors')
        .select('*');

      setSectors(sectorsResponse.data || []);
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const conquerorsResponse = await supabase
        .from('conquerors')
        .select('*');

      setConquerors(conquerorsResponse.data || []);
    }
    fetchData()
  }, [])



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    // add try / catch
    console.log("oi", formData.get('conquerors'));
    // const { data, error } = await 
    // supabase.from('routes').insert([{
    //   name: formData.get('name'),
    //   modality: formData.get('modality'),
    //   sector_id: formData.get('sector_id'),
    // }])
    // if (error) {
    //   setError(error.toString());
    //   console.warn(error);
    // } else {
    //   console.log(data);
      setLoading(false);
    //   navigate('/routes');
    // }

  };


  return (
    <>
      <h1>Adicionar Via</h1>
      { loading ?? <span>loading...</span> }
      <form onSubmit={handleSubmit}>
        <label>Nome da via</label>
        <input id="name" name="name" type="text" /><br />

        <label>Setor da via</label><br/>
        {(sectors || []).map((sector) => (
            <>
            <input 
                type="radio" 
                value={sector.id}
                id={sector.id} 
                name="sector_id" />
                <label>{sector.name}</label><br />
            </>
        ))}

        <label>Conquistadores</label><br/>
        <select id="conquerors" name="conquerors" multiple>
        {(conquerors || []).map((conqueror) => (
            <option key={conqueror.id}>{conqueror.first_name} {conqueror.last_name}</option>
        ))}
        </select>
        <br />
        <label>Modalidade:</label>
        <select id="modality" name="modality">
            <option>Esportiva</option>
            <option>Tradicional</option>
            <option>Boulder</option>
        </select><br />

        <input type="submit" value="submit"></input>
      </form>
      {/* {error.message} */}

    </>
  )
}

export default AddClimbRoutesPage;
