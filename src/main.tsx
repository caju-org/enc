import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/joy/styles';

import '@fontsource/public-sans';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </BrowserRouter>
  </React.StrictMode>,
)