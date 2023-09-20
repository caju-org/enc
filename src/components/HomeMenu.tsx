import { Link as RouterLink } from "react-router-dom";

import { useAuth } from "../hooks";

import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";

import Person from "@mui/icons-material/Person";

export default function HomeMenu() {
  const { session } = useAuth();

  return (
    <Box component="nav" aria-label="escalada no ceará" sx={{}}>
      <List role="menubar" orientation="horizontal" size="lg">
        <ListItem role="none">
          <ListItemButton role="menuitem" component={RouterLink} to="/">
            Página Inicial
          </ListItemButton>
        </ListItem>
        <ListItem role="none">
          <ListItemButton role="menuitem" component={RouterLink} to="/vias">
            Vias
          </ListItemButton>
        </ListItem>
        <ListItem role="none">
          <ListItemButton role="menuitem" component={RouterLink} to="/setores">
            Setores
          </ListItemButton>
        </ListItem>
        <ListItem role="none">
          <ListItemButton
            role="menuitem"
            component={RouterLink}
            to="/escaladores"
          >
            Escaladores
          </ListItemButton>
        </ListItem>

        {session?.user.email ? (
          <ListItem role="none" sx={{ marginInlineStart: "auto" }}>
            <ListItemButton role="menuitem" component={RouterLink} to="/perfil">
              <Person />
            </ListItemButton>
          </ListItem>
        ) : (
          <>
            <ListItem role="none" sx={{ marginInlineStart: "auto" }}>
              <ListItemButton
                role="menuitem"
                component={RouterLink}
                to="/entrar"
              >
                Entrar
              </ListItemButton>
            </ListItem>
            <ListItem role="none" sx={{ marginInlineStart: "auto" }}>
              <ListItemButton
                role="menuitem"
                component={RouterLink}
                to="/cadastrar"
              >
                Cadastrar
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );
}
