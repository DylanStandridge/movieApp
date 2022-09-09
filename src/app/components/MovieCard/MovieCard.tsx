import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/material/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Favorite from '@mui/icons-material/Favorite';
import { MovieCardData } from '../../../features/movieList/MovieListTypes';
import { CardActionArea, Paper } from '@mui/material';
import {useNavigate} from 'react-router-dom'

// JIRA: movie-3
// description Create a reusable movie card

export default function MovieCard(props: MovieCardData) {
  const navigate = useNavigate();
  const cardDrilldown = () => {
    navigate(`/movies/${props.id}`)  }
  // give the review count as 1.2k or 10.5M instead of a long number
  const simplifiedReviewCount = props.imDbRatingCount.split("")[0] + "." + props.imDbRatingCount.split("")[1] + (props.imDbRatingCount.split("").length > 6 ? "M" : "K")
  return (
    <Card elevation={12} sx={{ minWidth: 250, backgroundColor: 'whitesmoke' }}>
      <CardOverflow>
      <CardActionArea  onClick={cardDrilldown}>
        <AspectRatio ratio="128/176" >
          <img
            style={{ width: '100%' }}
            src={props.image}
            alt="Movie Cover Image"
          />
        </AspectRatio>
        </CardActionArea>
        <IconButton
          aria-label="Like minimal photography"
          size="md"
          variant="solid"
          color="danger"
          onClick={() => {
            props.favoriteMovie(props.id)
          }}
          sx={{
            position: 'absolute',
            zIndex: 2,
            borderRadius: '50%',
            right: '1rem',
            bottom: 0,
            backgroundColor: props.isFavorite ? 'red' : 'lightGrey',
            color: props.isFavorite ? 'white' : "red",
            transform: 'translateY(50%)',
          }}
        >
          <Favorite />
        </IconButton>
        <Paper
          sx={{
            position: 'absolute',
            width: '4rem',
            height: '4rem',
            zIndex: 2,
            left: '.75rem',
            top: '.75rem',
            backgroundColor: 'white',
            color: "red",
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex',
          }}
        >
          <Typography fontWeight="lg" level="body1" sx={{ color: 'black', display: 'flex', direction: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <Favorite sx={{color: 'red'}} /> {((parseFloat(props.imDbRating) / 10) * 100).toFixed(0)}%
          </Typography>
          <Typography level="body1" sx={{ fontSize: 'md', color: 'grey', display: 'flex', direction: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            {simplifiedReviewCount}
          </Typography>
        </Paper>
      </CardOverflow>
      <CardActionArea  onClick={cardDrilldown}>
      <Typography level="h2" fontWeight="lg" sx={{ fontSize: 'md', pl: 2, mr:2, mt: 3, display: 'flex', direction: 'row',  justifyContent: 'flex-start', width: '17rem', height:'35px' }}>
        {props.title}
      </Typography>
      <Typography level="h2" sx={{  fontSize: 'md', mt: 1,  pl: 2, display: 'flex', direction: 'row',  justifyContent: 'flex-start', width: '17rem', flexWrap:'wrap'   }}>
      {props.year}
      </Typography>
      <Box sx={{ m: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      </Box>
      </CardActionArea>
    </Card>
  );
}
