import React, { Dispatch, useEffect, useMemo, useState } from 'react';
import {
  selectFavorites,
  selectMovies,
  removeMovie,
  addMovie,
  removeFavorite,
  addFavorite
} from '../movieList/MovieSlice'
import { Box } from '@mui/joy';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Backdrop, CircularProgress, Paper } from '@mui/material';
import Typography from '@mui/joy/Typography';
import { fetchMovie } from './MovieApi';
import { FavoriteMovie } from '../movieList/MovieListTypes';
import { MovieDetailResponse, MovieDetails } from './MovieTypes';

//   Example-JIRA: movies-2 
//   Description: map the movies into the dynamic grid using Material UI's grid container and react-infinite-scroll-component
//   Grid: https://mui.com/material-ui/react-grid2/ 
//   scroller: https://www.npmjs.com/package/react-infinite-scroll-component

export function Movie() {


  const favorites: FavoriteMovie[] = useAppSelector(selectFavorites)
  const regMovies: FavoriteMovie[] = useAppSelector(selectMovies)
  const [hasData, setHasData] = useState(false)
  const [movieDetails, setMovieDetails] = useState({} as MovieDetails)
  const [width, setWidth] = useState(0)
  const [errorState, setErrorState] = useState(false)
  let apiCalled = false
  const dispatch = useAppDispatch()



  useEffect(() => {
    // Fetch items from cached state.
    if (!apiCalled) {
      apiCalled = true
      fetchMovieList()
    }
    setWidth(window.innerWidth)
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    }
  }, [errorState]);

  const fetchMovieList = () => {
    // initial render to grab the movie list and load it from api into redux state
    setHasData(true)
    const currentWindow = window.location.pathname.split('/')
    fetchMovie(currentWindow[currentWindow.length - 1]).then((data: MovieDetailResponse) => {
      if (data.error == null && data.items.id != undefined) handleMovieDetails(data.items)
      else { setErrorState(true)}
    })
  }

  const resizeHandler = () => {
    setWidth(window.innerWidth)
  }

  const handleMovieDetails = (data: MovieDetails) => {
    // its in regular movies change its details and add it to the array while removing the original copy
    let regMovie = regMovies.find(mov => mov.id === data.id);
    let faveMovie = favorites.find(mov => mov.id === data.id);
    if (regMovie != undefined) {
      dispatch(removeMovie(regMovie))
      dispatch(addMovie({ ...regMovie, movieDetails: data }))
    }
    // its in favorite movies change its details and add it to the array while removing the original copy
    else if (faveMovie != undefined) {
      dispatch(removeFavorite(faveMovie))
      dispatch(addFavorite({ ...faveMovie, movieDetails: data }))
    }
    setMovieDetails(data)
  }
  if (errorState) {
    return (
      <Box sx={{ p: '.5rem', width: '98%', mt: '5rem'}}>
        <Typography>Houston, we've got a problem</Typography>
    </Box>
    )
  }
  return (
    <Box sx={{ p: '.5rem', width: '98%', mt: '3rem'}}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!hasData}
        invisible={hasData}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Paper elevation={12} sx={{ display: 'flex', m:5, alignItemsn:'center', flexWrap: width > 800 ? 'noWrap' : 'wrap' }}>
        <Box sx={{display:'flex', justifyContent:'center'}}>
          <img src={movieDetails.image} style={{ width: width > 800 ? '25rem' : '100%'}}/>
        </Box>
        <Box sx={{ m: '3rem' }}>
          <Typography level="h4" fontWeight="lg" fontSize='2rem' >{movieDetails.fullTitle}</Typography>
          <Typography fontWeight="lg" fontSize='1.5rem' sx={{ mt: '.5rem', }}>Plot</Typography>
          <Typography level="body1" sx={{ fontSize: 'md', mt:'1rem'}}>{movieDetails.plot} </Typography>
          <Typography level="body1" sx={{ fontSize: 'md', mt:'1rem'}}><b>Awards:</b> {movieDetails.awards} </Typography>
          <Typography level="body1" sx={{ fontSize: 'md', mt:'1rem'}}><b>Stars:</b> {movieDetails.stars} </Typography>
          <Typography level="body1" sx={{ fontSize: 'md', mt:'1rem'}}><b>Writers:</b> {movieDetails.writers} </Typography>
          <Typography level="body1" sx={{ fontSize: 'md', mt:'1rem'}}><b>Directors:</b> {movieDetails.directors} </Typography>
          <Typography level="body1" sx={{ fontSize: 'md', mt:'1rem'}}><b>Budget:</b> {movieDetails.boxOffice?.budget} </Typography>
          <Typography level="body1" sx={{ fontSize: 'md', mt:'1rem'}}><b>Runtime:</b> {movieDetails.runtimeStr} Rated: {movieDetails.contentRating}</Typography>
        </Box>
      </Paper>
    </Box>
  );

}

