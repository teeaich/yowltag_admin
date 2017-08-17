import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import logo from './logo.svg';
import './App.css';


import { ApolloClient, createNetworkInterface,  gql, graphql} from 'react-apollo';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://799gtq53sl.execute-api.us-east-1.amazonaws.com/dev/graphql',
  }),
});

class App extends Component {

  render() {
    return (
      <ApolloProvider client={client}>
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h2>Welcome to React</h2>
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}

export default graphql(gql`
    query {locationRecords {
        long,
        lat,
        user,
        timestamp,
        dataObject
    }}
`)(App);
