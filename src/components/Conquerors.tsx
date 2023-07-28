import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

type Conquerors = any[];

const Conquerors = () => {
  const [conquerors, setConquerors] = useState<Conquerors>();

  useEffect(() => {
    const fetchData = async () => {
      const conquerorsResponse = await supabase
        .from('conquerors')
        .select('*');
      setConquerors(conquerorsResponse.data || []);
    }

    fetchData()
  }, [])

  return (
    <>
      <ul>
        {(conquerors || []).map((conqueror) => (
          <li key={conqueror.id}>
            {conqueror.first_name} {conqueror.last_name}
          </li>
        ))}
      </ul>
    </>
  )
}

export default Conquerors;
