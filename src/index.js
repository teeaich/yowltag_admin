import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom'
import { routerMiddleware } from 'react-router-redux';
import combinedReducer, { client } from './reducers';
import { ApolloProvider } from 'react-apollo';


import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const history = createBrowserHistory();

const middlewares = [
  client.middleware(),
  routerMiddleware(history)
];

const store = createStore(
  combinedReducer,
  {}, // initial state
  compose(
    applyMiddleware(...middlewares),
    // If you are using the devToolsExtension, you can add it here also
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  )
);


ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <Router history={history}>
      <App/>
    </Router>
  </ApolloProvider>
  ,
  document.getElementById('root'));
registerServiceWorker();
