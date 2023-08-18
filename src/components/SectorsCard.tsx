import * as React from 'react';

import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import TerrainOutlinedIcon from '@mui/icons-material/TerrainOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
// import ImageIcon from '@mui/icons-material/Image';

type SectorsCardProps = {
  key: string;
  name: React.ReactNode;
  description: React.ReactNode;
  how_to_get_there: React.ReactNode;
  city: string;
  state: string;
  updated_at: string;
  image: string;
  liked?: boolean;
  awesomePlace?: boolean;
};

export default function SectorsCard({
  key,
  city,
  state,
  name,
  description,
  how_to_get_there, 
  updated_at,
  awesomePlace= false,
  liked = false,
  image,
}: SectorsCardProps) {
  const [isLiked, setIsLiked] = React.useState(liked);
  return (
    <Card
      key={key}
      variant="outlined"
      orientation="horizontal"
      sx={{
        transition: '250ms all',
        padding: {
          xs: 0,
          sm: 2,
        },
        boxShadow: 'none',
        borderRadius: 'sm',
        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
      }}
    >
      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        width="100%"
        spacing={2.5}
      >
        <Box
          sx={{
            width: {
              xs: '100%',
              sm: 200,
            },
            marginBottom: {
              xs: -2.5,
              sm: 0,
            },
          }}
        >
          <AspectRatio
            ratio={16 / 9}
            sx={(theme) => ({
              borderRadius: 'xs',
              [theme.breakpoints.down('sm')]: {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              },
            })}
          >
            {/* <div>
              <ImageIcon sx={{ display: 'block', fontSize: '4rem', opacity: 0.4 }} />
            </div> */}
            <img alt="" src={image} style={{ display: 'block' }} />
            {awesomePlace && (
              <Chip
                variant="soft"
                startDecorator={<EmojiEventsOutlinedIcon />}
                size="sm"
                sx={{ position: 'absolute', bottom: 8, left: 8 }}
              >
                pico irado!
              </Chip>
            )}
            <IconButton
              variant={isLiked ? 'solid' : 'soft'}
              onClick={() => setIsLiked((prev) => !prev)}
              sx={{
                position: 'absolute',
                bottom: 8,
                right: 8,
                display: { xs: 'flex', sm: 'none' },
              }}
            >
              <StarBorderOutlinedIcon />
            </IconButton>
          </AspectRatio>
        </Box>
        <Stack
          sx={{
            padding: {
              xs: 2,
              sm: 0,
            },
          }}
          spacing={1}
          flex={1}
        >
          <Stack
            spacing={1}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <div>
              <Typography fontWeight="md" fontSize="lg">
                <Link
                  overlay
                  underline="none"
                  href="#interactive-card"
                  sx={{ color: 'text.primary' }}
                >
                  {name}
                </Link>
              </Typography>
            </div>
            <IconButton
              variant={isLiked ? 'solid' : 'soft'}
              onClick={() => setIsLiked((prev) => !prev)}
              sx={{
                display: { xs: 'none', sm: 'flex' },
              }}
            >
              <StarBorderOutlinedIcon />
            </IconButton>
          </Stack>
          <Stack spacing={1} direction="row">
            <Typography level="body-md">{description}</Typography>
          </Stack>

          <Stack spacing={1} direction="row">
            <Typography level="body-md">
              <strong>Como chegar:</strong> {how_to_get_there}
            </Typography>
          </Stack>

          <Stack spacing={3} direction="row">
            <Typography 
              level="body-sm" 
              startDecorator={<PlaceOutlinedIcon />}>
              {city}/{state}
            </Typography>
            <Typography
              level="body-sm"
              startDecorator={<TerrainOutlinedIcon />}
              display={{
                xs: 'none',
                md: 'flex',
              }}
            >
              30 vias 
            </Typography>

            <Typography sx={{ flexGrow: 1, textAlign: 'right' }}>
              <Typography
                level="body-sm"
                startDecorator={<TodayOutlinedIcon/>}
              >
                {updated_at}
              </Typography>
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}