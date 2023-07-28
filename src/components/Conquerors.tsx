import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const Conquerors = () => {
  const [conquerors, setConquerors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await supabase
        .from('conquerors')
        .select('*');

      setConquerors(data);
      return data
    }

    fetchData()
  }, [])

  return (
    <>
      <ul>
        {(conquerors?.data || []).map((conqueror) => (
          <li key={conqueror.id}>
            {conqueror.first_name} {conqueror.last_name}
          </li>
        ))}
      </ul>
    </>
  )
}

export default Conquerors;
