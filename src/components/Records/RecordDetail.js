import React, { Component } from 'react';
import Subheader from 'material-ui/Subheader';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { gql, graphql, compose } from 'react-apollo';
import loadersCSS from 'loaders.css/loaders.min.css';
import moment from 'moment';
import GoogleMap from 'google-map-react';
import Marker from './Marker';

import styles from './RecordDetail.css';

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
    const recordData = data.record.recordData.data;
    if (!data.loading && recordData) {
      if (recordData.length) {
        const center = [recordData[0].lat, recordData[0].long];
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
    let bgGeoConfigParsed;
    if (!data.loading) {
      markers = data.record.recordData.data.map((el, index) => {
        return (<Marker
          key={index}
          lat={el.lat}
          lng={el.long}
          dataObject={el.dataObject}
          bgGeoConfig={el.bgGeoConfig}
        ></Marker>)
      });
      bgGeoConfigParsed = JSON.parse(data.record.recordData.bgGeoConfig);
    }
    return (
      <div className={styles.contentContainer}>
        <div className={styles.gmapsContainer}>
          <GoogleMap
            apiKey={'AIzaSyDMOwTZ34ZMxKgERARKpRvW1bdygthR28g'}
            center={this.state.center}
            zoom={this.props.zoom}
          >
            {markers}
          </GoogleMap>
        </div>
        <div className={styles.infoContainer}>
          <h1 className="headline">Configuration</h1>
          <Table
            height={'calc(100vh - 203px)'}
            fixedHeader={true}
            selectable={false}>
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Property</TableHeaderColumn>
                <TableHeaderColumn>Value</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}>
              {!data.loading ? (
                Object.entries(bgGeoConfigParsed).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableRowColumn>{key.toString()}</TableRowColumn>
                    <TableRowColumn>{value.toString()}</TableRowColumn>
                  </TableRow>
                ))
              ) : (
                <span>loading</span>
              )}
            </TableBody>
          </Table>
        </div>

      </div>
    );
  }
}

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
                bgGeoConfig,
                data {
                    id,
                    lat,
                    long,
                    dataObject,
                    bgGeoConfig,
                    timestamp
                }
            }
        }}
`;

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

const withRecordQuery = graphql(RECORD_QUERY, {
  options: ({ match }) => ({ variables: { id: match.params.id } })
});

export default withRouter(compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRecordQuery
)(RecordDetail));
