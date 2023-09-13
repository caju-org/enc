import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import { supabase } from "../../supabaseClient";

import Autocomplete from "@mui/joy/Autocomplete";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import { chipClasses } from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import Typography from "@mui/joy/Typography";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";

import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";

import { STATE_ID_MAP } from "../../utils";

import slugify from "react-slugify";

export default function AddSector() {
  // const auth = useAuth();
  const { session, profile } = useAuth();
  const [allStates, setAllStates] = useState([] as string[]);
  const [allCities, setAllCities] = useState([] as string[]);
  const [state, setState] = useState("Ceará");
  const [city, setCity] = useState("");
  const [modalStatus, setModalStatus] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!session && !profile) {
      console.log(session, profile);
    }
  }, [profile, session]);

  useEffect(() => {
    const fetchData = async () => {
      const statesResponse = await supabase.from("states").select("name");

      setAllStates(statesResponse?.data?.map((state) => state.name) || []);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (state) {
      const fetchData = async () => {
        const citiesResponse = await supabase
          .from("cities")
          .select("name")
          .eq("state_id", STATE_ID_MAP[state as keyof typeof STATE_ID_MAP]);

        setAllCities(citiesResponse?.data?.map((city) => city.name) || []);
      };
      fetchData();
    }
  }, [state]);

  const updateCities = async (state: string) => {
    const fetchData = async () => {
      const citiesResponse = await supabase
        .from("cities")
        .select("name")
        .eq("state_id", STATE_ID_MAP[state as keyof typeof STATE_ID_MAP]);

      setAllCities(citiesResponse?.data?.map((city) => city.name) || []);
    };
    fetchData();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const description = formData.get("description");
    const how_to_get_there = formData.get("how_to_get_there");

    const { data: state_id, error: state_error } = await supabase
      .from("states")
      .select("id")
      .eq("name", state)
      .single();
    if (state_error) {
      console.warn(state_error);
    }

    const { data: city_id, error: city_error } = await supabase
      .from("cities")
      .select("id")
      .eq("name", city)
      .single();
    if (city_error) {
      console.warn(city_error);
    }

    const { data, error } = await supabase.from("sectors").insert({
      name,
      description,
      how_to_get_there,
      slug: slugify(name?.toString()),
      state_id: state_id?.id,
      city_id: city_id?.id,
      state_name: state,
      city_name: city,
    });
    if (error) {
      console.warn(error);
    } else {
      setModalStatus(true);
      console.log(data);
    }
  };

  const refreshAfterSave = async () => {
    setModalStatus(false);
    navigate("/setores");
  };

  return (
    <>
      <Modal open={modalStatus} onClose={refreshAfterSave}>
        <ModalDialog>
          <ModalClose />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Novo setor cadastrado com sucesso
          </Typography>
          <Typography>
            <strong>Agora</strong> você pode adicionar novas vias nesse setor.
          </Typography>
        </ModalDialog>
      </Modal>
      <Box
        sx={{
          flex: 1,
          maxWidth: 1200,
          width: "100%",
          mx: "auto",
        }}
      >
        <Typography level="h1" fontSize="xl2" sx={{ mb: 1 }}>
          Novo setor
        </Typography>
        <Tabs defaultValue={0} sx={{ bgcolor: "transparent" }}>
          <Box
            sx={{
              "--_shadow-height": "16px",
              height: 0,
              position: "sticky",
              top: "calc(48px - var(--main-paddingTop, 0px) + var(--Header-height, 0px) - (var(--_shadow-height) / 2))",
              zIndex: 1,
              "&::before": {
                content: '""',
                display: "block",
                position: "relative",
                zIndex: 1,
                height: "var(--_shadow-height)",
                background:
                  "radial-gradient(closest-side, rgba(0 0 0 / 0.12), transparent 100%)",
              },
            }}
          />
          <TabList
            sticky="top"
            variant="plain"
            sx={(theme) => ({
              "--Chip-minHeight": "20px",
              "--ListItem-minHeight": "48px",
              top: "calc(-1 * (var(--main-paddingTop, 0px) - var(--Header-height, 0px)))",
              zIndex: 10,
              width: "100%",
              overflow: "auto hidden",
              alignSelf: "flex-start",
              scrollSnapType: "inline",
              "&::after": {
                pointerEvents: "none",
                display: { xs: "block", sm: "none" },
                content: '""',
                position: "sticky",
                top: 0,
                width: 40,
                flex: "none",
                zIndex: 1,
                right: 0,
                borderBottom: "1px solid transparent",
                background: `linear-gradient(to left, ${theme.vars.palette.background.body}, rgb(0 0 0 / 0))`,
                backgroundClip: "content-box",
              },
              "&::-webkit-scrollbar": {
                width: 0,
                display: "none",
              },
              [`& .${tabClasses.root}`]: {
                "--focus-outline-offset": "-2px",
                "&:first-of-type": {
                  ml: "calc(-1 * var(--ListItem-paddingX))",
                },
                scrollSnapAlign: "start",
                bgcolor: "transparent",
                flex: "none",
                "&:hover": {
                  bgcolor: "transparent",
                },
                [`&.${tabClasses.selected}`]: {
                  color: "primary.plainColor",
                  bgcolor: "transparent",
                  [`& .${chipClasses.root}`]: theme.variants.solid.primary,
                },
              },
            })}
          >
            <Tab value={0}>Detalhes do setor</Tab>
          </TabList>
          <form method="post" onSubmit={handleSubmit}>
            <Box
              sx={{
                pt: 3,
                pb: 10,
                display: "grid",
                gridTemplateColumns: {
                  xs: "100%",
                  sm: "minmax(120px, 30%) 1fr",
                  lg: "280px 1fr minmax(120px, 208px)",
                },
                columnGap: { xs: 2, sm: 3, md: 4 },
                rowGap: { xs: 2, sm: 2.5 },
                "& > hr": {
                  gridColumn: "1/-1",
                },
              }}
            >
              <FormLabel sx={{ display: { xs: "none", sm: "block" } }}>
                Nome
              </FormLabel>
              <Box sx={{ display: { xs: "contents", sm: "flex" }, gap: 2 }}>
                <FormControl sx={{ flex: 1 }}>
                  <FormLabel sx={{ display: { sm: "none" } }}>Nome</FormLabel>
                  <Input name="name" required placeholder="Nome do setor" />
                </FormControl>
              </Box>

              <Divider role="presentation" />

              <FormLabel sx={{ display: { xs: "none", sm: "block" } }}>
                Estado e Cidade
              </FormLabel>
              <Box sx={{ display: { xs: "contents", sm: "flex" }, gap: 2 }}>
                <FormControl sx={{ flex: 1 }}>
                  <FormLabel sx={{ display: { sm: "none" } }}>Estado</FormLabel>
                  <Autocomplete
                    placeholder="Escolha o seu Estado de origem"
                    required
                    value={state}
                    options={allStates}
                    onChange={(_, newStateValue) => {
                      updateCities(newStateValue!);
                      setState(newStateValue!);
                    }}
                  />
                </FormControl>
                <FormControl sx={{ flex: 1 }}>
                  <FormLabel sx={{ display: { sm: "none" } }}>
                    Sobrenome
                  </FormLabel>
                  <Autocomplete
                    placeholder="Escolha a Cidade de origem"
                    required
                    value={city}
                    options={allCities}
                    onChange={(_, newCityValue) => {
                      setCity(newCityValue!);
                    }}
                  />
                </FormControl>
              </Box>

              <Divider role="presentation" />

              <FormLabel>Descrição</FormLabel>
              <Box sx={{ display: { xs: "contents" }, gap: 2 }}>
                <Textarea
                  name="description"
                  required
                  minRows={4}
                  sx={{ mt: 1.5 }}
                />
                <FormHelperText>Breve descrição sobre o setor.</FormHelperText>
              </Box>

              <Divider role="presentation" />

              <FormLabel>Como chegar?</FormLabel>
              <Box sx={{ display: { xs: "contents" }, gap: 2 }}>
                <Textarea
                  name="how_to_get_there"
                  required
                  minRows={4}
                  sx={{ mt: 1.5 }}
                />
                <FormHelperText>
                  Explicação de como chegar no setor.
                </FormHelperText>
              </Box>

              <Divider role="presentation" />

              <Box
                sx={{
                  gridColumn: "1/-1",
                  justifySelf: "flex-end",
                  display: "flex",
                  gap: 1,
                }}
              >
                <Button
                  variant="outlined"
                  color="neutral"
                  onClick={() => navigate(-1)}
                >
                  Cancelar
                </Button>
                <Button type="submit">Salvar</Button>
              </Box>
            </Box>
          </form>
        </Tabs>
      </Box>
    </>
  );
}
