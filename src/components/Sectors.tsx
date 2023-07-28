import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

type Sectors = any[];

const SectorsComponent = () => {
  const [sectors, setSectors] = useState<Sectors>();

  useEffect(() => {
    const fetchData = async () => {
      const sectorsResponse = await supabase
        .from('sectors')
        .select('*');

      setSectors(sectorsResponse.data || []);
    }

    fetchData()
  }, [])

  return (
    <>
        {(sectors || []).map((sector) => (
        <dl key={sector.id}>
          <dt><strong>{sector.name}</strong></dt>
          <dd>descrição: {sector.description}</dd>
          <dd>como chegar: {sector.how_to_get_there}</dd>
          <dd>cidade: {sector.city}</dd>
          <dd>estado: {sector.state}</dd>
        </dl>
        ))}
    </>
  )
}

export default SectorsComponent;