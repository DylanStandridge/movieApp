import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { FavoriteMovie } from './MovieListTypes';

export interface MovieState {
  favorites: FavoriteMovie[];
  regMovies: FavoriteMovie[];
}

const initialState: MovieState = {
  favorites: [] as FavoriteMovie[],
  regMovies: [] as FavoriteMovie[]

};

export const movieSlice = createSlice({
  name: 'faves',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addFavorite(state, action: PayloadAction<FavoriteMovie>) {
      state.favorites = [...state.favorites, {...action.payload, isFavorite:true}];
    },
    removeFavorite(state, action: PayloadAction<FavoriteMovie>) {
      state.favorites = state.favorites.filter(mov => mov.id !== action.payload.id);
    },
    // this is a dump of the api call. replace it
    addMovies(state, action: PayloadAction<FavoriteMovie[]>){
      state.regMovies = [...action.payload];
    },
    addMovie(state, action: PayloadAction<FavoriteMovie>) {
      state.regMovies = [...state.regMovies, {...action.payload, isFavorite:false}];
    },
    removeMovie(state, action: PayloadAction<FavoriteMovie>) {
      state.regMovies = state.regMovies.filter(mov => mov.id !== action.payload.id);
    }
  }
});
export const selectFavorites = (state: RootState) => state.movieState.favorites;
export const selectMovies = (state: RootState) => state.movieState.regMovies;

const { actions, reducer } = movieSlice

export const { addFavorite, removeFavorite, addMovies, addMovie, removeMovie } = actions;
export default reducer;

