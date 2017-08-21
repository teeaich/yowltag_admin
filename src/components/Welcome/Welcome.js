import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';


const Welcome = props => (
  <div>
    <h1>Home</h1>
    <p>Welcome home!</p>
    <button onClick={() => props.changePage()}>Go to records page via redux</button>
  </div>
);

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/records')

}, dispatch);

export default withRouter(connect(
  null,
  mapDispatchToProps
)(Welcome))