import { Outlet } from 'react-router-dom';

import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import homeTheme from './theme';

import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Container from '@mui/joy/Container';
import { typographyClasses } from '@mui/joy/Typography';

import AppFooter from '../components/AppFooter';

  export default function HomeLayout({
    reversed,
  }: React.PropsWithChildren<{ reversed?: boolean }>) {

  return (
    <>
      <CssVarsProvider
        defaultMode="light" 
        disableTransitionOnChange
        theme={homeTheme}
      >
      <GlobalStyles styles={{ }} />
      <CssBaseline />
         <Container
          sx={(theme) => ({
            position: 'relative',
            minHeight: '75vh',
            display: 'flex',
            flexDirection: reversed ? 'column-reverse' : 'column',
            alignItems: 'center',
            py: 10,
            gap: 4,
            [theme.breakpoints.up(834)]: {
              flexDirection: 'row',
              gap: 6,
            },
            [theme.breakpoints.up(1199)]: {
              gap: 12,
            },
          })}
        >
          <Box
            sx={(theme) => ({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              maxWidth: '70ch',
              textAlign: 'center',
              flexShrink: 999,
              [theme.breakpoints.up(834)]: {
                minWidth: 620,
                alignItems: 'flex-start',
                textAlign: 'initial',
              },
              [`& .${typographyClasses.root}`]: {
                textWrap: 'balance',
              },
            })}
          >
            <Outlet />
          </Box>
          <AspectRatio
            ratio={600 / 520}
            variant="outlined"
            maxHeight={300}
            sx={(theme) => ({
              minWidth: 300,
              alignSelf: 'stretch',
              [theme.breakpoints.up(834)]: {
                alignSelf: 'initial',
                flexGrow: 1,
                '--AspectRatio-maxHeight': '520px',
                '--AspectRatio-minHeight': '400px',
              },
              borderRadius: 'sm',
              bgcolor: 'background.level2',
              flexBasis: '50%',
            })}
          >
            <img
              src="https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2"
              alt="mountain with clouds"
            />
          </AspectRatio>
        </Container>
      <AppFooter />
    </CssVarsProvider>
    </>
  )
}