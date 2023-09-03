// import { Link as RouterLink } from 'react-router-dom';

import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';

import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';

type ClimbersCardProps = {
  id: string;
  name: string;
  is_conqueror: string;
  is_partner: string;
  city: string;
  state: string;
  created_at: string;
  updated_at?: string;
  stars?: number;
  image?: string;
  liked?: boolean;
};

export default function ClimbersCard({
  // id,
  name,
  is_conqueror,
  is_partner,
  city,
  state,
  created_at,
  // liked = false,
}: ClimbersCardProps) {
  // const [isLiked, setIsLiked] = React.useState(liked);

  const handleProfileName = (name: string) => {
    if (name) {
      const initials = name.match(/\b(\w)/g);
      if (initials === null) {
        return null
      }
      return initials.join('');
    }
  }

  return (
    <>
    <Card
      variant="outlined"
      sx={{
        maxWidth: 380,
        overflow: 'auto',
        transition: '250ms all',
        mb: 2,
        padding: {
          xs: 2,
          sm: 2,
        },
        boxShadow: 'none',
        borderRadius: 'sm',
        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Avatar variant="outlined" size="lg">{handleProfileName(name)}</Avatar>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Typography
            level="body-sm"
            startDecorator={<TodayOutlinedIcon/>}
          >
            {created_at}
          </Typography>
        </Box>
      </Box>
      <CardContent>
        <Typography level="title-lg">{name}</Typography>
        <Typography level="body-sm">
          {city}/{state}
        </Typography>
      </CardContent>
      <CardActions buttonFlex="0 1 120px">
        { is_conqueror == "Sim" ? 
          <Chip size="sm">conquistador(a)</Chip>
          :
          null
        }
        { is_partner == "Sim" ? 
          <Chip size="sm" color="primary">parceiro de escalada</Chip>
          :
          null
        }
      </CardActions>
    </Card>
    </>
  );
}