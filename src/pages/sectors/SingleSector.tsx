import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabaseClient";

import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";

import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";

type Sector = {
  id: React.ReactNode;
  name: string;
  slug: string;
  description: string;
  how_to_get_there: string;
  stars: number;
  states: { name: string; uf: string }[];
  cities: { name: string }[];
  city_id: number;
  state_id: number;
};

const SingleSectorPage = () => {
  const [sector, setSector] = useState<Sector | null>();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const sectorResponse = await supabase
        .from("sectors")
        .select(
          `
          id,name,slug,description,how_to_get_there,stars,city_id,state_id,created_at,updated_at,
          states(name,uf),
          cities(name)
        `
        )
        .eq("slug", params.slug)
        .single();

      setSector(sectorResponse?.data);
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
        <Typography level="h1" fontSize="xl2" sx={{ mb: 1 }}>
          Setores / {sector?.name}
        </Typography>

        <Card sx={{ minHeight: "280px", width: 320 }}>
          <CardCover>
            <img
              src="https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320"
              srcSet="https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320&dpr=2 2x"
              loading="lazy"
              alt=""
            />
          </CardCover>
          <CardCover
            sx={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
            }}
          />
          <CardContent sx={{ justifyContent: "flex-end" }}>
            <Typography level="title-lg" textColor="#fff">
              Yosemite National Park
            </Typography>
            <Typography
              startDecorator={<PlaceOutlinedIcon />}
              textColor="neutral.300"
            >
              California, USA
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default SingleSectorPage;
