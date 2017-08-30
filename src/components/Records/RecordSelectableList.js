import React, { Component } from 'react';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import { Subheader, Chip } from 'material-ui';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { gql, graphql, compose } from 'react-apollo';
import loadersCSS from 'loaders.css/loaders.min.css';
import moment from 'moment';

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    constructor(props) {
      super(props);
    }

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);

function getDate(date) {
  return moment(date, 'x').format('DD.MM.YYYY HH:mm');

}
class RecordSelectableList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, showRecordDetail } = this.props;
    debugger;
    return <SelectableList>
      <Subheader>Available records</Subheader>
      {(data.loading ?
          <h1>Loading</h1> :
          (data.records.map((element, index) => (
            <ListItem
              key={index}
              value={element.id}
              primaryText={element.name}
              secondaryText={<div>
                <span>{getDate(element.timestamp)}</span>
                <Chip style={{position: 'absolute', right: '5px', bottom: '50%'}}>{(element.recordData.batteryDrain *100).toFixed(2)} %</Chip>
              </div>
              }
              secondaryTextLines={2}
              onClick={() => showRecordDetail(element.id)}
            />)))
      )}
    </SelectableList>
  }
}


const styles = {};

const RECORDS_QUERY = gql`
    query { records {
        id,
        user {
            id,
            first_name,
            last_name,
        },
        name,
        timestamp,
        recordData {
            batteryDrain,
            bgGeoConfig
        }
    }}
`;

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
  showRecordDetail: (id) => push(`/records/${id}`)

}, dispatch);

const withRecordsQuery = graphql(RECORDS_QUERY);

export default withRouter(compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRecordsQuery
)(RecordSelectableList));
