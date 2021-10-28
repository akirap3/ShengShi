import React from 'react';
import Map from './LocationMap';

const Mymap = (props) => {
  const defaultCenter = {};

  const setCurrentLocation = (position) => {
    defaultCenter.lat = position.coords.latitude;
    defaultCenter.lng = position.coords.longitude;
  };

  if (navigator.geolocation.getCurrentPosition(setCurrentLocation)) {
  } else {
    defaultCenter.lat = 25.04267234987771;
    defaultCenter.lng = 121.56497334150076;
  }

  return (
    <div style={{ margin: '100px' }}>
      <Map
        google={props.google}
        center={{ lat: defaultCenter.lat, lng: defaultCenter.lng }}
        height="300px"
        zoom={15}
        handleAddress={props.handleAddress}
        handleLatLng={props.handleLatLng}
      />
    </div>
  );
};

export default Mymap;
