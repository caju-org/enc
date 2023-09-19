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

import slugify from "react-slugify";

type Sector = {
  id: string;
  name: string;
  cities: {
    name: string;
  }[];
  states: {
    uf: string;
  }[];
};

type Conqueror = {
  id: string;
  name: string;
};

export default function AddRoute() {
  // const auth = useAuth();
  const { session, profile } = useAuth();
  const [allSectors, setAllSectors] = useState<Sector[] | null>([]);
  const [allConquerors, setAllConquerors] = useState<Conqueror[] | null>([]);
  const [conquerors, setConquerors] = useState<Conqueror[]>([]);
  const [sector, setSector] = useState<Sector>();
  const [modalStatus, setModalStatus] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!session && !profile) {
      console.log(session, profile);
    }
  }, [profile, session]);

  useEffect(() => {
    const fetchData = async () => {
      const sectorsResponse = await supabase
        .from("sectors")
        .select(`id,name, cities(name), states(uf)`);

      if (sectorsResponse) {
        setAllSectors(sectorsResponse?.data);
        console.log(sectorsResponse?.data);
      }
      //   setAllSectors(sectorsResponse?.data?.map((sector) => sector.name) || []);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const conquerorsResponse = await supabase
        .from("conquerors")
        .select(`id,name`);

      if (conquerorsResponse) {
        setAllConquerors(conquerorsResponse?.data);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    // const description = formData.get("description");

    const { data, error } = await supabase
      .from("climb_routes")
      .insert({
        name,
        slug: slugify(name?.toString()),
        sector_id: sector?.id,
      })
      .select()
      .single();
    if (error) {
      console.warn(error);
    } else {
      saveConquerors(data?.id);
      // setModalStatus(true);
    }
  };

  const saveConquerors = async (climb_route_id: string) => {
    const d = (conquerors || []).map((conqueror) => ({
      climb_route_id: climb_route_id,
      conqueror_id: conqueror.id,
    }));

    const { data, error } = await supabase
      .from("routes_conquerors")
      .insert(d)
      .select();
    if (error) {
      console.warn(error);
      return -1;
    } else {
      console.log(data);
      return 0;
    }
  };

  const refreshAfterSave = async () => {
    setModalStatus(false);
    navigate("/vias");
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
            Nova via cadastrada com sucesso
          </Typography>
          <Typography>
            Alguém com poder de moderação vai checar se está tudo certo, se
            tiver, sua via será adicionada ao site.
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
          Nova via
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
            <Tab value={0}>Detalhes da via</Tab>
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
                  <Input name="name" required placeholder="Nome da via" />
                </FormControl>
              </Box>

              <Divider role="presentation" />

              <FormLabel sx={{ display: { xs: "none", sm: "block" } }}>
                Setor
              </FormLabel>
              <Box sx={{ display: { xs: "contents", sm: "flex" }, gap: 2 }}>
                <FormControl sx={{ flex: 1 }}>
                  <FormLabel sx={{ display: { sm: "none" } }}>Setor</FormLabel>
                  <Autocomplete
                    placeholder="Qual o setor da via?"
                    required
                    options={allSectors || []}
                    getOptionLabel={(option) =>
                      option?.name +
                      " (" +
                      option?.cities[0]?.name +
                      "/" +
                      option?.states[0]?.uf +
                      ")"
                    }
                    onChange={(_, newSector) => {
                      setSector(newSector!);
                    }}
                  />
                </FormControl>
              </Box>

              <Divider role="presentation" />

              <FormLabel sx={{ display: { xs: "none", sm: "block" } }}>
                Conquistadores
              </FormLabel>
              <Box sx={{ display: { xs: "contents", sm: "flex" }, gap: 2 }}>
                <FormControl sx={{ flex: 1 }}>
                  <FormLabel sx={{ display: { sm: "none" } }}>
                    Conquistadores
                  </FormLabel>
                  <Autocomplete
                    multiple
                    placeholder="Escolha quem conquistou a via?"
                    options={allConquerors || []}
                    getOptionLabel={(option) => option?.name}
                    onChange={(_, newConquerors) => {
                      setConquerors(newConquerors!);
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
                <FormHelperText>
                  Breve descrição sobre a via. Sem betas aqui!
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
