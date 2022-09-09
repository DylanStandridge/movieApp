import React, { Component } from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import App from '../App';
import { BrowserRouter as Router } from "react-router-dom";
import { createRenderer } from 'react-dom/test-utils';
import { debug } from 'console';

test('render app with header navigation',async () => {
  const comp =render(
      <Provider store={store}>
      <Router>
      <App />
      </Router>
    </Provider>
  );
  // look to see that the element exists within the dom object after rendering
  const headerTitle = await comp.findAllByText("Movie Project")
  const favoritesButton = await comp.findAllByText("Favorites")
  const contactButton = await comp.findAllByText("Contact")

  expect(headerTitle).toBeTruthy()
  expect(favoritesButton).toBeTruthy()
  expect(contactButton).toBeTruthy()
});
