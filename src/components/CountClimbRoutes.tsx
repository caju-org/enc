import { useState, useEffect } from "react";

import { supabase } from "../supabaseClient";

type CountClimbRoutesProps = {
  id?: React.ReactNode;
};

export default function CountClimbRoutes({ id }: CountClimbRoutesProps) {
  const [routesNumber, setRoutesNumber] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const routesResponse = await supabase
          .from("climb_routes")
          .select("id", { count: "exact", head: true })
          .eq("sector_id", id);
        setRoutesNumber(routesResponse.count || 0);
      } else {
        const routesResponse = await supabase
          .from("climb_routes")
          .select("id", { count: "exact", head: true });
        setRoutesNumber(routesResponse.count || 0);
      }
    };

    fetchData();
  }, [id]);

  return <>{routesNumber}</>;
}
