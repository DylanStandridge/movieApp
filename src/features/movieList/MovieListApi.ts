// JIRA: movies-1 
// Descriptions: This is a get call to retrieve (arguably) the greatest movies of all time.
import { Movie, MovieResponse } from "./MovieListTypes"

// Swagger Documentation: https://imdb-api.com/api#Top250Movies-header
export async function fetchMovies(): Promise<MovieResponse>{
  return fetch("https://imdb-api.com/en/API/Top250Movies/k_sb7e4jl8")
  .then((response) => response.json())
  .then((data) => ({
          items: data.items as Movie[],
          error: null
      } as MovieResponse
  ))
  .catch( err => ({
    items: [],
    error: err
} as MovieResponse
) );
}



