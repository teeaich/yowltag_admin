import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar } from 'material-ui';
import { Route, Switch } from 'react-router-dom';
import Welcome from './components/Welcome/Welcome';
import Records from './components/Records/Records';
import './App.css';

class App extends Component {

  render() {
    const { data } = this.props;
    return (
      <MuiThemeProvider>
        <div style={styles.app}>
          <AppBar
            title="yowltag admin"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <main style={styles.appContent}>
              <Route exact path="/" component={Welcome}/>
              <Route path="/records" component={Records}/>
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  app: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
  },
  appContent: {
    display: 'flex',
    flex: 1,
    height: 'calc(100vh - 64px)'
  }
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
