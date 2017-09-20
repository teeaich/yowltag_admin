import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { ApolloClient, createNetworkInterface } from 'react-apollo';

export const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    //uri: 'https://799gtq53sl.execute-api.us-east-1.amazonaws.com/dev/graphql',
    uri: 'http://localhost:3000/graphql',
  }),
});


const reducers = combineReducers({
  routing: routerReducer,
  apollo: client.reducer(),
});

export default reducers;