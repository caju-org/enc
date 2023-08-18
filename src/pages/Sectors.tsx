import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

import Typography from '@mui/joy/Typography';
import SectorsCard from '../components/SectorsCard';

type Sectors = any[];

const SectorsPage = () => {
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
      <Typography level="h1" fontSize="xl2" sx={{ mb: 1 }}>
        Setores 
      </Typography>

      {(sectors || []).map((sector) => (
      <SectorsCard 
        key={sector.id}
        name={sector.name}
        description={sector.description}
        how_to_get_there={sector.how_to_get_there}
        city={sector.city}
        state={sector.state}
        updated_at={sector.updated_at}
        awesomePlace 
        image="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400"
        />
      ))}
    </>
  )
}

export default SectorsPage;
