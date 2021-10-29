import React from 'react';
import Map from './LocationMap';

const Mymap = (props) => {
  return (
    <div style={{ margin: '100px' }}>
      <Map
        google={props.google}
        center={props.defaultCenter}
        height="300px"
        zoom={15}
        handleAddress={props.handleAddress}
        handleLatLng={props.handleLatLng}
      />
    </div>
  );
};

export default Mymap;
