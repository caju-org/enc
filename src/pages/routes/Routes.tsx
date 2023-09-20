import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { supabase } from "../../supabaseClient";

import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";

// import RoutesCard from "../../components/RoutesCard";
import { Button } from "@mui/joy";
import ClimbRoutesCard from "../../components/RoutesCard";

type Routes = any[];

const RoutesPage = () => {
  const [routes, setRoutes] = useState<Routes>();

  useEffect(() => {
    const fetchData = async () => {
      const routesResponse = await supabase.from("climb_routes").select(`
          id,name,slug,description,modality,length,created_at,updated_at,
          sectors(name, city_id, state_id)
        `);

      setRoutes(routesResponse.data || []);
    };

    fetchData();
  }, []);

  console.log(routes);

  return (
    <>
      <Box
        sx={{
          flex: 1,
          maxWidth: 1200,
          width: "100%",
          mx: "auto",
        }}
      >
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
          marginBottom={2}
        >
          <Typography level="h1" fontSize="xl2" sx={{ mb: 1 }}>
            Vias
          </Typography>
          <Button component={RouterLink} to="adicionar">
            Adicionar nova via de escalada
          </Button>
        </Stack>

        {(routes || []).map((route) => (
          <React.Fragment key={route.id}>
            <ClimbRoutesCard
              name={route.name}
              slug={route.slug}
              sector={route.sectors}
              description={route.description}
              modality={route.modality}
              length={route.length}
              updated_at={new Date(route.updated_at).toLocaleString()}
              stars={route.stars}
              image="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400"
            ></ClimbRoutesCard>
          </React.Fragment>
        ))}
      </Box>
    </>
  );
};

export default RoutesPage;
