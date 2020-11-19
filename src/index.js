import React from 'react';
import { render } from 'react-dom';
import { App } from './components/App';
import './main.css';
import { ThemeProvider } from './theme';
import { createStore } from 'redux';
import { rootReducer } from './redux/reducers';
import { Provider } from 'react-redux';

const store = createStore(rootReducer);

const root = document.getElementById('root');

render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>,
  root
);
