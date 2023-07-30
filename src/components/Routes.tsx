import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

type Routes = any[];

const RoutesComponent = () => {
  const [routes, setRoutes] = useState<Routes>();

  useEffect(() => {
    const fetchData = async () => {
      const routesResponse = await supabase
        .from('routes')
        .select('*');
      setRoutes(routesResponse.data || []);
    }

    fetchData()
  }, [])

  return (
    <>
      <ul>
        {(routes || []).map((route) => (
          <li key={route.id}>
            {route.name} (modalidade: {route.modality})
          </li>
        ))}
      </ul>
    </>
  )
}

export default RoutesComponent;
