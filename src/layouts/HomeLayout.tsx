import { Outlet } from "react-router-dom";

import { CssVarsProvider } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import homeTheme from "./theme";

import Stack from "@mui/joy/Stack";
// import Container from "@mui/joy/Container";

// import AppFooter from "../components/AppFooter";
import HomeMenu from "../components/HomeMenu";
import AppFooter from "../components/AppFooter";

export default function HomeLayout() {
  return (
    <>
      <CssVarsProvider
        defaultMode="light"
        disableTransitionOnChange
        theme={homeTheme}
      >
        <GlobalStyles
          styles={{
            ":root": {
              "--Transition-duration": "0.4s", // set to `none` to disable transition
            },
          }}
        />
        <CssBaseline />
        <Stack
          sx={(theme) => ({
            minHeight: "100dvh",
            justifyContent: "space-between",
            transition: "width var(--Transition-duration)",
            transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
            zIndex: 1,
            backdropFilter: "blur(1px)",
            backgroundColor: "rgba(255 255 255 / 0.6)",
            [theme.getColorSchemeSelector("dark")]: {
              backgroundColor: "rgba(19 19 24 / 0.4)",
            },
          })}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              m: 2,
            }}
          >
            <p>logo</p>
            <HomeMenu />
          </Stack>
          <Stack
            sx={{
              alignItems: "center",
              m: 2,
            }}
          >
            <Outlet />
          </Stack>
          <AppFooter />
        </Stack>
      </CssVarsProvider>
    </>
  );
}
