import { Dispatch, Selector } from "@reduxjs/toolkit";
import { MovieDetails } from "../movie/MovieTypes";
import { MovieState } from "./MovieSlice";

export interface MovieResponse {
    items: Movie[],
    error: Error | null
}

// the response from the api 
export interface Movie {
    id: string;
    rank: string;
    title: string;
    fullTitle: string;
    year: string;
    image: string;
    crew: string;
    imDbRating: string;
    imDbRatingCount: string;
}

// full movie listing for list page that includes function to favorite the item
export interface MovieListing extends FavoriteMovie {
    favoriteMovie: (id: string) => void;
}

//subset of movie data needed for the individual cards
export interface MovieCardData {
    id: string;
    title: string;
    year: string;
    image: string;
    imDbRating: string;
    imDbRatingCount: string;
    isFavorite: boolean;
    favoriteMovie: (id: string) => void;
}
// store data type that excludes the favorite function
export interface FavoriteMovie extends Movie {
    movieDetails: MovieDetails | null;
    isFavorite: boolean;
}