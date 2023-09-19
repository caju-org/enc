import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";

export default function Home() {
  return (
    <>
      <Stack sx={{ mb: 10, mt: 10 }}>
        <Typography
          level="h1"
          fontWeight="xl"
          fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
        >
          Encontre aqui o croqui de diversas vias de escalada
        </Typography>
        <Typography fontSize="lg" textColor="text.secondary" lineHeight="lg">
          Além disso você pode encontrar parceiros de escalada, instruções de
          como chegar na base da via e mais.
        </Typography>
      </Stack>
    </>
  );
}
