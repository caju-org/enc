import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import { ButtonGroup } from '@mui/joy';

export default function Home() {
  return (
    <>
      <Typography
        level="h1"
        fontWeight="xl"
        fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
      >
        Encontre aqui o croqui de diversas vias de escalada
      </Typography>
      <Typography fontSize="lg" textColor="text.secondary" lineHeight="lg">
        Além disso você pode encontrar parceiros de escalada, instruções de como
        chegar na base da via e mais.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          textAlign: 'center',
          alignSelf: 'stretch',
          justifyContent: 'center',
          alignItems: 'center',
          columnGap: 4
        }}
      >
        <ButtonGroup color="primary" variant="solid" size="lg">
          <Button 
            component={RouterLink}
            to="/vias"
            fullWidth>
            Vias 
          </Button>
          <Button 
            component={RouterLink}
            to="/setores"
            fullWidth>
            Setores 
          </Button>
          <Button 
            component={RouterLink}
            to="/escaladores"
            fullWidth>
            Escaladores 
          </Button>
        </ButtonGroup>
      </Box>
      <Box
        sx={(theme) => ({
          display: 'flex',
          textAlign: 'center',
          alignSelf: 'stretch',
          columnGap: 4.5,
          '& > *': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            flex: 1,
          },
          [theme.breakpoints.up(834)]: {
            textAlign: 'left',
            '& > *': {
              flexDirection: 'row',
              gap: 1.5,
              justifyContent: 'initial',
              flexWrap: 'nowrap',
              flex: 'none',
            },
          },
        })}
      >
        <Box>
          <Typography
            fontSize="xl4"
            fontWeight="lg"
          >
            +100
          </Typography>
          <Typography textColor="text.secondary">
            vias<br /> cadastradas
          </Typography>
        </Box>
        <Box>
          <Typography fontSize="xl4" fontWeight="lg">
            +20
          </Typography>
          <Typography textColor="text.secondary">
            setores <br /> cadastrados
          </Typography>
        </Box>
        <Box>
          <Typography fontSize="xl4" fontWeight="lg">
            +150
          </Typography>
          <Typography textColor="text.secondary">
            escaladores <br /> cadastrados
          </Typography>
        </Box>
      </Box>

      <Typography
        level="body-xs"
        sx={{
          position: 'absolute',
          top: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        escalada no ceará 
      </Typography>
    </>
  );
}