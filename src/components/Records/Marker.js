import React from 'react';
import ReactTooltip from 'react-tooltip'
import moment from 'moment';

import styles from './Markers.css'


function getDate(date) {
  return moment(date).format('DD.MM.YYYY HH:mm');
}

const Marker = ({bgGeoConfig, dataObject, key}) => {
  // const bgGeoConfigParsed = JSON.parse(bgGeoConfig);
  const dataObjectParsed = JSON.parse(dataObject);
  const randomString = Math.random().toString(36).substring(7);
 return (
   <div className={styles.markers}
        data-tip data-for={randomString}>
     <ReactTooltip id={randomString} type='warning' effect='solid'>
       <div>time:  {getDate(dataObjectParsed.timestamp)}</div>
       <div>battery: {(dataObjectParsed.battery.level*100).toFixed(2)} %</div>
       <div>activity: {dataObjectParsed.activity.confidence}, {dataObjectParsed.activity.type}</div>
       <div>heading: {dataObjectParsed.coords.heading}</div>
       <div>speed: {dataObjectParsed.coords.speed}</div>
       <div>accuracy: {dataObjectParsed.coords.accuracy}</div>
       <div>is moving: {dataObjectParsed.is_moving}</div>
       <div>odometer: {dataObjectParsed.odometer}</div>
     </ReactTooltip>
   </div>
 )
};

export default Marker;
