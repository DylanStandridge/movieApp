// JIRA: movies-6 
// Descriptions: This grabs the details of an individual movie to be brought to the UI and added to the state

import { MovieDetailResponse, MovieDetails } from "./MovieTypes"
// https://imdb-api.com/API#Title-header
export async function fetchMovie(titleId: string): Promise<MovieDetailResponse>{
  return fetch(`https://imdb-api.com/en/API/Title/k_sb7e4jl8/${titleId}`)
  .then((response) => response.json())
  .then((data) => {
    return ({
          items: data as MovieDetails,
          error: null
      } as MovieDetailResponse
  )
    }) 
  .catch( err => ({
    items:  {} as MovieDetails,
    error: err
} 
));
}



