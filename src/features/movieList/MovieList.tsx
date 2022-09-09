import React, { Dispatch, useEffect, useMemo, useState } from 'react';
import {
  fetchMovies
} from './MovieListApi';
import {
  addFavorite,
  addMovie,
  addMovies,
  removeFavorite,
  removeMovie,
  selectFavorites,
  selectMovies
} from './MovieSlice'
import MovieCard from '../../app/components/MovieCard/MovieCard';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { FavoriteMovie, Movie, MovieListing, MovieResponse } from './MovieListTypes';
import { Box } from '@mui/joy';
import CustomizedInputBase from '../../app/components/SearchBar';
import ReactPaginate from "react-paginate";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Backdrop, CircularProgress } from '@mui/material';

//   Example-JIRA: movies-2 
//   Description: map the movies into the dynamic grid using Material UI's grid container and React-Pagination
//   MUI: https://mui.com/material-ui

export function MovieList() {

  const [isFavoriteList, setIsFavoriteList] = useState((window.location.pathname === '/favorites' ? true : false))
  // an array to map the full return of the api into react state so we can combine with favorites
  // pageCount render the total pages for pagination
  const [pageCount, setPageCount] = useState(0);
  // current items to display from pagination results (or search results)
  const [currentItems, setCurrentItems] = useState(([] as FavoriteMovie[]));
  // boolean to tell ui not to paginate when returning full results
  const [searching, setSearching] = useState(false)
  // offset is use to determine which indices to render into current items
  const [itemOffset, setItemOffset] = useState(0);
  const favorites: FavoriteMovie[] = useAppSelector(selectFavorites)
  const regMovies: FavoriteMovie[] = useAppSelector(selectMovies)
  let [movies, setMovies] = useState([] as MovieListing[]);
  const [hasData, setHasData] = useState(false);
  let apiCalled = false
  const dispatch = useAppDispatch()
  // used to set items per page loaded

  const itemsPerPage = 15



  useEffect(() => {
    // Fetch items from cached state.
    if (regMovies.length === 0 && favorites.length === 0 && !apiCalled) {
      apiCalled = true
      fetchMovieList()
    }
    
    //if we arent searching the data then render as pagination
    if ((!searching && [...regMovies, ...favorites].length > 0) || isFavoriteList) {
      setHasData(true)
      const endOffset = itemOffset + itemsPerPage;
      if (window.location.pathname == '/favorites') {
        setCurrentItems([...favorites].slice(itemOffset, endOffset));
        setPageCount(Math.ceil(movies.length / itemsPerPage));
      }
      else {
        setCurrentItems([...favorites, ...regMovies].slice(itemOffset, endOffset));
        setPageCount(Math.ceil([...favorites, ...regMovies].length / itemsPerPage));
      }
    }
  }, [itemOffset, itemsPerPage, searching, window.location.pathname, favorites, regMovies, hasData]);

  const fetchMovieList = () => {
    // initial render to grab the movie list and load it from api into redux state
    let regItems: FavoriteMovie[] = [];
    fetchMovies().then((data: MovieResponse) => {
      if (data.error == undefined || data.error?.message == ''){
      (data.items as Movie[]).forEach((element: Movie) => {
        regItems.push({ ...element, isFavorite: false, movieDetails: null })
      })
      dispatch(addMovies(regItems))
    }
    })

  }

  const favoriteAMovie = (movId: string) => {
    let indOfFave: number | null = null
    const faveMov: FavoriteMovie | undefined = [...regMovies, ...favorites].find((curMov) => {
      if (curMov.id === movId) {
        return curMov
      }
    })
    if (faveMov) {
      // if its not currently a favorite add it and remove from reg movies
      if (!faveMov.isFavorite) {
        dispatch(addFavorite(faveMov))
        dispatch(removeMovie(faveMov))
      }
      else {
        // get rid of it from the fave movies list and add to reg movies
        dispatch(removeFavorite(faveMov as FavoriteMovie))
        dispatch(addMovie(faveMov))
      }
    }
  }

  const searchMovies = (movieString: string) => {
    let searchedMovies = [...favorites, ...regMovies].filter((mov) => mov.fullTitle.toLowerCase().includes(movieString.toLowerCase()))
    if (movieString !== '') {
      setSearching(true)
      setCurrentItems(searchedMovies)
    }
    else {
      setSearching(false)
      handlePageClick({ selected: 0 })
    }
  }

  // render each individual item in the movie list and determine if its a favorite
  const Item = (props: MovieListing) => {
    return (
      <Grid xs={12} sm={12} md={4} lg={3} xl={2.4} display="flex" justifyContent="center" alignItems="center" key={props.id}>
        <MovieCard image={props.image} id={props.id} title={props.title} year={props.year} imDbRating={props.imDbRating} imDbRatingCount={props.imDbRatingCount} favoriteMovie={props.favoriteMovie} isFavorite={props.isFavorite} />
      </Grid>
    )
  }

  const GridRender = () => {
    // this is the grid container which allows us to dynamically render 
    return (
      <Grid container rowSpacing={2} columnSpacing={1} sx={{ pt: 5, }}>
        {currentItems.map((item: FavoriteMovie) => <Item key={item.rank} {...item} favoriteMovie={favoriteAMovie} />)}
      </Grid>
    )
  }

  const handlePageClick = (event: { selected: number; }) => {
    const newOffset = (event.selected * itemsPerPage) % [...favorites, ...regMovies].length;
    setItemOffset(newOffset);
    window.scrollTo(0, 0);

  };

  return (
    <Box sx={{ p: '1rem', width: '98%', mt: '6rem', textAlign: 'center' }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!hasData}
        invisible={hasData}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <CustomizedInputBase searchMovie={searchMovies} />
      </Box>
      <GridRender />
      {!searching && (currentItems.length !== 0 ) &&
        <ReactPaginate
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="<"
          breakLabel="..."
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"} />}
    </Box>
  );

}

