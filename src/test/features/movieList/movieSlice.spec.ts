import { FavoriteMovie, Movie } from '../../../features/movieList/MovieListTypes';
import movieListReducer, { addMovie, MovieState } from '../../../features/movieList/MovieSlice'
import items from './movieList.json'

describe('counter reducer', () => {
  const initialState:MovieState = {
    favorites: [] as FavoriteMovie[],
    regMovies: [] as FavoriteMovie[]
  }; 
   it('should handle initial state', () => {
    expect(movieListReducer(undefined, { type: 'unknown' })).toEqual({
      favorites: [],
      regMovies: []
    });
  });

  it('should handle increment', () => {
    const actual = movieListReducer(initialState, addMovie({
      id: 'tt1234',
      rank: '1',
      title: 'The Joker',
      fullTitle: "The Joker (2019)",
      year: '2019',
      image: '/some/path/to/url',
      crew: 'idk',
      imDbRating: '9.5',
      imDbRatingCount: '1,000,000',
      movieDetails: null, isFavorite: false } as FavoriteMovie ));
    expect(actual.regMovies[0].id).toEqual('tt1234');
  });