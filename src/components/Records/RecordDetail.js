import React, { Component } from 'react';
import Subheader from 'material-ui/Subheader';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { gql, graphql, compose } from 'react-apollo';
import loadersCSS from 'loaders.css/loaders.min.css';
import moment from 'moment';
import GoogleMap from 'google-map-react';
import Marker from './Marker';

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
    this.state = props;

  }

  componentWillReceiveProps({ data }) {
    //!state.apollo.data.loading && state.apollo.data.record.recordData.length ? [state.apollo.data.record.recordData[0].lat, state.apollo.data.record.recordData[0].long] : []
    if (!data.loading && data.record.recordData) {
      if (data.record.recordData.length) {
        const center = [data.record.recordData[0].lat, data.record.recordData[0].long];
        this.setState((prev, props) => ({ center }));
      }
    }
  }

  getDate = (date) => {
    return moment(date, 'x').format('DD.MM.YYYY HH:mm');
  };

  render() {
    const { data } = this.props;
    let markers = [];
    if (!data.loading) {
      markers = data.record.recordData.map((el, index) => {
        return (<Marker
          key={index}
          lat={el.lat}
          lng={el.long}
          dataObject={el.dataObject}
          bgGeoConfig={el.bgGeoConfig}
      ></Marker>)
      });

      console.log(markers);
      console.log(this.state.center);
    }
    return (
      <div style={styles.gmapsContainer}>
        <GoogleMap
          apiKey={'AIzaSyDMOwTZ34ZMxKgERARKpRvW1bdygthR28g'}
          center={this.state.center}
          zoom={this.props.zoom}
        >
          {markers}
        </GoogleMap>
      </div>
    );
  }
}


const styles = {
  gmapsContainer: {
    height: '100%'
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

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
  centerMap: () => console.log('as')

}, dispatch);

const withRecordQuery = graphql(RECORD_QUERY, {
  options: ({ match }) => ({ variables: { id: match.params.id } })
});

export default withRouter(compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRecordQuery
)(RecordDetail));
