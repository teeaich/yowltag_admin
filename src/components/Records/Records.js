import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import RecordSelectableList from './RecordSelectableList';
import RecordDetail from './RecordDetail';

class Records extends Component {

  render() {
    const { data } = this.props;
    return (
      <div style={styles.navContent}>
        <nav style={styles.nav}>
          <RecordSelectableList/>
        </nav>
        <main style={styles.mainContent}>
          <Route exact path='/records/:id' component={RecordDetail}/>
        </main>
      </div>
    );
  }
}

const styles = {
  navContent: {
    display: 'flex',
    flex: 1,
  },
  nav: {
    flex: '0 0 25em',
    overflowX: 'hidden',
    overflowY: 'auto'
  },
  mainContent: {
    flex: 1,
  }
};

export default withRouter(Records);
