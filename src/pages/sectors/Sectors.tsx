import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { supabase } from "../../supabaseClient";

import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";

import SectorsCard from "../../components/SectorsCard";
import { Button } from "@mui/joy";

type Sectors = any[];

const SectorsPage = () => {
  const [sectors, setSectors] = useState<Sectors>();

  useEffect(() => {
    const fetchData = async () => {
      const sectorsResponse = await supabase.from("sectors").select(`
          id,name,slug,description,how_to_get_there,stars,city_id,state_id,created_at,updated_at,
          states(uf),
          cities(name)
        `);

      setSectors(sectorsResponse.data || []);
    };

    fetchData();
  }, []);

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
            Setores
          </Typography>
          <Button component={RouterLink} to="adicionar">
            Adicionar novo setor
          </Button>
        </Stack>

        {(sectors || []).map((sector) => (
          <React.Fragment key={sector.id}>
            <SectorsCard
              id={sector.id}
              name={sector.name}
              slug={sector.slug}
              description={sector.description}
              how_to_get_there={sector.how_to_get_there}
              city={sector.cities.name}
              state={sector.states.uf}
              updated_at={new Date(sector.updated_at).toLocaleString()}
              stars={sector.stars}
              image="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400"
            ></SectorsCard>
          </React.Fragment>
        ))}
      </Box>
    </>
  );
};

export default SectorsPage;
