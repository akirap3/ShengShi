import React, { useEffect, useState } from 'react';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const RestaurantMap = ({ contentData }) => {
  const locations = contentData.map((restaurant) => restaurant.location);
  return <Map locations={locations} />;
};

const Map = compose(
  withProps({
    // googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    isMarkerShown: true,
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: 25.04267234987771, lng: 121.56497334150076 }}
  >
    {props.locations.map((location, index) => (
      <Marker
        key={index}
        position={{
          lat: location._lat,
          lng: location._long,
        }}
      />
    ))}
  </GoogleMap>
));

export default RestaurantMap;
