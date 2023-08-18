import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';

import Person from '@mui/icons-material/Person';

export default function ENCMenu() {
  const [open, setOpen] = React.useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.session) {
    auth.getSession();
  }

  if (!auth.profile && Boolean(auth?.session)) {
    auth.getProfile(auth.session.user.id);
  }

  const buttonRef = React.useRef(null);
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async (event: React.MouseEvent) => {
    event.preventDefault();
    auth.signout(() => navigate("/"));
  }

  return (
    <>
      <Box 
        component="nav" 
        aria-label="escalada no ceará" 
        sx={{ 
          display: 'flex',
          justifyContent: 'right',
          flexGrow: 1
        }}
      >
        <List 
          role="menubar" 
          orientation="horizontal" 
          sx={{
            justifyContent: 'right',
            '--List-radius': '8px',
            '--List-padding': '4px',
            '--List-gap': '8px',
          }} 
        >
          <ListItem role="none">
            <ListItemButton 
              color="primary" 
              variant="plain" 
              role="menuitem" 
              component={RouterLink} 
              to="/sectors"
              sx={{ fontWeight: "lg" }}
            >
              Setores
            </ListItemButton>
          </ListItem>
          <ListItem role="none">
            <ListItemButton 
              color="primary" 
              variant="plain" 
              role="menuitem" 
              component={RouterLink} 
              to="/conquerors"
              sx={{ fontWeight: "lg" }}
            >
              Conquistadores 
            </ListItemButton>
          </ListItem>
          { auth.session?.user ? 
          <>
          <ListItem role="none">
            <Button
              ref={buttonRef}
              color="primary" 
              variant="plain" 
              aria-label="Profile"
              onClick={() => {
                setOpen(!open);
              }}
            >
              <Person />
            </Button>
            <Menu
              id="person-menu"
              anchorEl={buttonRef.current}
              open={open}
              onClose={handleClose}
              aria-labelledby="person-menu-button"
            >
              <MenuItem
                component={RouterLink}
                to="/profile"
                sx={{ fontWeight: "lg" }}
              >
                Perfil
              </MenuItem>
              <MenuItem 
                component="a"
                onClick={handleLogout}
                sx={{ fontWeight: "lg" }}
              >
                Sair
              </MenuItem>
            </Menu>
          </ListItem>
          </>
          :
          <ListItem role="none">
            <ListItemButton 
              color="primary" 
              variant="plain" 
              role="menuitem" 
              component={RouterLink} 
              to="/signin"
              sx={{ fontWeight: "lg" }}
            >
              Acessar 
            </ListItemButton>
          </ListItem>
          }
      </List>
    </Box>
  </>
  )
}
