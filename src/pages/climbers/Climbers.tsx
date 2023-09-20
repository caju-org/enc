import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Grid from "@mui/joy/Grid";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

import ClimbersCard from "../../components/ClimbersCard";

type Climbers = any[];

const ClimbersPage = () => {
  const [climbers, setClimbers] = useState<Climbers>();

  useEffect(() => {
    const fetchData = async () => {
      const climbersResponse = await supabase.from("profiles").select(`
          id,name,state_name,city_name,is_conqueror,is_partner,created_at,updated_at`);

      setClimbers(climbersResponse.data || []);
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
            Escaladores
          </Typography>
          <Button>Adicionar novo(a) escalador(a)</Button>
        </Stack>

        <Grid
          container
          spacing={{ xs: 2, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ flexGrow: 1 }}
        >
          {(climbers || []).map((climber) => (
            <React.Fragment key={climber.id}>
              <Grid xs={6} sm={4} md={4} sx={{ flexGrow: 1 }}>
                <ClimbersCard
                  id={climber.id}
                  name={climber.name}
                  is_conqueror={climber.is_conqueror}
                  is_partner={climber.is_partner}
                  city={climber.city_name}
                  state={climber.state_name}
                  created_at={new Date(climber.created_at).toLocaleDateString()}
                  image="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400"
                ></ClimbersCard>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default ClimbersPage;
