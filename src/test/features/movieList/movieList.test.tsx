import React, { Component } from 'react';
import { BrowserRouter, BrowserRouter as Router, Navigate } from "react-router-dom";
import { createRenderer } from 'react-dom/test-utils';
import { debug } from 'console';
import {MovieList} from '../../../features/movieList/MovieList'
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../../../App';
import { Provider } from 'react-redux';
import { configureStore, createStore } from '@reduxjs/toolkit';
import { addMovie, addMovies, MovieState } from '../../../features/movieList/MovieSlice';
import { FavoriteMovie } from '../../../features/movieList/MovieListTypes';
import { store } from '../../../app/store';

const initialState: MovieState = {
    favorites: [] as FavoriteMovie[],
    regMovies: [] as FavoriteMovie[]
};



// wrapper to provide both store and browser router to components
const MockMovieListWithoutItems = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <MovieList />
            </BrowserRouter>
        </Provider>
    )
}

const MockMovieListWithItems = () => {
    store.dispatch(addMovie({
        id: 'tt1234',
        rank: '1',
        title: 'The Joker',
        fullTitle: "The Joker (2019)",
        year: '2019',
        image: '/some/path/to/url',
        crew: 'idk',
        imDbRating: '9.5',
        imDbRatingCount: '1,000,000',
        movieDetails: null, isFavorite: false
    } as FavoriteMovie
    ))
    return (
        <Provider store={store}>
            <BrowserRouter>
                <MovieList />
            </BrowserRouter>
        </Provider>
    )
}

test('render movie list and validate its search bar is displayed with loading screen and no elements', async () => {
    render(<MockMovieListWithoutItems />)
    const searchBar = await screen.findByPlaceholderText("Search Movies")
    const searchClearButton = await screen.findByLabelText("clear")
    const loadingSpinner = await screen.findByLabelText('loading spinner')

    expect(searchClearButton).toBeDisabled()
    expect(searchBar).toBeInTheDocument()
    expect(loadingSpinner).toBeVisible()
    fireEvent.click(loadingSpinner)
});


test('find the elements favorite button, click it, and then validate the redux state is updated', async () => {
    render(<MockMovieListWithItems />)
    expect(store.getState().movieState.regMovies.length).toBeTruthy
    const favoritesIcon = await screen.findByLabelText ('Favorite Button')
    expect(favoritesIcon).toBeInTheDocument()
    screen.debug()
    expect(store.getState().movieState.favorites.length).toBeTruthy
    expect(store.getState().movieState.regMovies.length).toBeFalsy
});