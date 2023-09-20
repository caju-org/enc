import Box from '@mui/joy/Box';
import Container from '@mui/joy/Container';
import Divider from '@mui/joy/Divider';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

import GitHubIcon from '@mui/icons-material/GitHub';

import SvgMuiLogotype from './footer/SvgMuiLogotype';

export default function AppFooter() {

  return (
    <Container component="footer">

      <Box
        sx={{
          py: 8,
          display: 'grid',
          gridAutoColumns: '1fr',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 4,
          gridTemplateColumns: { xs: '1fr', sm: '1fr', md: '1fr 1.75fr', lg: '1fr 1fr' },
          gridTemplateRows: 'auto',
          '& a:not(.MuiIconButton-root)': {
            pt: 0.5,
            pb: 0.5,
            color: 'secondary',
            typography: 'body-xs',
            '&:hover': {
              color: 'primary',
              textDecoration: 'underline',
            },
          },
        }}
      >

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr 1fr' },
            gridAutoColumns: '1fr',
            gap: 4,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography fontWeight="bold" level="body-xs" sx={{ mb: 0.5 }}>
              Explorar 
            </Typography>
            <Link href="/vias">Vias</Link>
            <Link href="/setores">Setores</Link>
            <Link href="/escaladores">Escaladores</Link>
            <Link href="/entrar">Entrar</Link>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography fontWeight="bold" level="body-xs" sx={{ mb: 0.5 }}>
              Parceiros 
            </Typography>
            <Link href="#/blah">ACEE</Link>
            <Link href="#/blah">Fábrica de Monstrinhos</Link>
            <Link href="#/blah">Loja 01</Link>
            <Link href="#/blah">Loja 02</Link>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography fontWeight="bold" level="body-xs" sx={{ mb: 0.5 }}>
              Escalada no Ceará 
            </Typography>
            <Link href="/sobre">Sobre</Link>
            <Link href="/politica-de-privacidade">Política de Privacidade</Link>
            <Link target="_blank" rel="noopener noreferrer" href="mailto:contact@mui.com">
              Entre em contato
            </Link>
          </Box>
        </Box>
        <div>
          <Typography level="body-xs" fontWeight="bold">
            Fique por dentro
          </Typography>
          <Typography level="body-xs" sx={{ mb: 1 }}>
            Enviaremos um e-mail com as novas vias cadastradas no site sempre que possível.
          </Typography>
          {/* <EmailSubscribe sx={{ mb: 4 }} /> */}
        </div>
      </Box>

      <Divider />

      <Box
        sx={{
          my: 6,
          display: { xs: 'block', sm: 'flex' },
          alignItems: { sm: 'center' },
          justifyContent: { xs: 'center', sm: 'space-between' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'start', sm: 'center' },
            gap: 1.5,
          }}
        >
          <Link href="/" aria-label="Go to homepage">
            <SvgMuiLogotype height={28} width={91} />
          </Link>
          <Typography level="body-xs" fontWeight={400}>
            escalada no ceará - {new Date().getFullYear()}.
          </Typography>
        </Box>
        <Box sx={{ mt: { xs: 3, sm: 0 } }}>
          <Stack spacing={2} direction="row">
              <GitHubIcon fontSize="small" />
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}