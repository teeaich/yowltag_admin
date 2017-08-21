import React, { Component } from 'react';
import Subheader from 'material-ui/Subheader';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { gql, graphql, compose } from 'react-apollo';
import loadersCSS from 'loaders.css/loaders.min.css';
import moment from 'moment';
import GoogleMap from 'google-map-react';

class RecordDetail extends Component {
  static defaultProps = {
    center: [37.34520782, -122.0960117],
    zoom: 15,
    visibleRowFirst: -1,
    visibleRowLast: -1,
    hoveredRowIndex: -1
  };

  constructor(props) {
    super(props);

  }

  componentWillMount() {
  }


  getDate = (date) => {
    console.log(moment(date, 'x'));
    return moment(date, 'x').format('DD.MM.YYYY HH:mm');
  };

  render() {
    const { data } = this.props;
    let markers = [];
    if (!data.loading) {
      markers = data.record.recordData.map((el, index) => {
        return (<span style={{ width: '10px', height: '10px', background: 'red', display: 'inline-block' }}
                      key={index}
                      lat={el.lat}
                      lng={el.long}
        ></span>)
      });

      console.log(markers);
    }
    return (
      <div style={styles.gmapsContainer}>
        <GoogleMap
          apiKey={'AIzaSyDMOwTZ34ZMxKgERARKpRvW1bdygthR28g'}
          center={this.props.center}
          zoom={this.props.zoom}
        >
          {markers}
        </GoogleMap>
        <h5>{JSON.stringify(data.record)}</h5>
      </div>
    );
  }
}


const styles = {
  gmapsContainer: {
    width: '1000px',
    height: '600px'
  }
};

const RECORD_QUERY = gql`
    query record($id: ID!) {
        record(id: $id) {
            id,
            user {
                id,
                first_name,
                last_name,
            },
            name,
            timestamp,
            recordData {
                id,
                recordId,
                lat,
                long,
                timestamp,
                dataObject,
                bgGeoConfig
            }
        }}
`;

const mapStateToProps = state => ({
  markers: [{
    position: {
      lat: 25.0112183,
      lng: 121.52067570000001,
    },
    key: `Taiwan`,
    defaultAnimation: 2,
  }]
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onMapLoad: () => console.log('as')

}, dispatch);

const withRecordQuery = graphql(RECORD_QUERY, {
  options: ({ match }) => ({ variables: { id: match.params.id } })
});

export default withRouter(compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRecordQuery
)(RecordDetail));
