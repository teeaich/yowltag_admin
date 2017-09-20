import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import RecordSelectableList from './RecordSelectableList';
import RecordDetail from './RecordDetail';

import styles from './Record.css';

class Records extends Component {

  render() {
    const { data } = this.props;
    return (
      <div className={styles.navContent}>
        <nav className={styles.nav}>
          <RecordSelectableList/>
        </nav>
        <main className={styles.mainContent}>
          <Route exact path='/records/:id' component={RecordDetail}/>
        </main>
      </div>
    );
  }
}

export default withRouter(Records);
