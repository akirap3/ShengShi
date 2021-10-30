import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  InfoWindow,
  Marker,
} from 'react-google-maps';
import Geocode from 'react-geocode';
import Autocomplete from 'react-google-autocomplete';
require('dotenv').config();

const GoogleMapsAPI = process.env.REACT_APP_GOOGLE_API_KEY;

Geocode.setApiKey(GoogleMapsAPI);
Geocode.enableDebug();

const Map = (props) => {
  const dispatch = useDispatch();
  const latLng = useSelector((state) => state.latLng);
  const [address, setAddress] = useState('');
  const [mapPosition, setMapPosition] = useState({
    lat: props.center.lat,
    lng: props.center.lng,
  });
  const [markerPosition, setMarkerPosition] = useState({
    lat: props.center.lat,
    lng: props.center.lng,
  });

  useEffect(() => {
    let isMounted = true;
    Geocode.fromLatLng(mapPosition.lat, mapPosition.lng).then((response) => {
      console.log('ComponentDidmount:', response);
      const address = response.results[0].formatted_address;
      if (isMounted) setAddress(address ? address : '');
    });

    return () => (isMounted = false);
  }, [mapPosition.lat, mapPosition.lng]);

  const onInfoWindowClose = (event) => {};

  const onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat();
    let newLng = event.latLng.lng();
    dispatch({ type: 'latLng/get', payload: [newLat, newLng] });
    Geocode.fromLatLng(newLat, newLng).then((response) => {
      const address = response.results[0].formatted_address;
      setAddress(address ? address : '');
      setMarkerPosition({
        lat: newLat,
        lng: newLng,
      });
      setMapPosition({
        lat: newLat,
        lng: newLng,
      });
    });
  };

  const onPlaceSelected = (place) => {
    console.log('plc', place);
    const address = place.formatted_address;
    const latValue = place.geometry.location.lat();
    const lngValue = place.geometry.location.lng();

    setAddress(address ? address : '');
    setMarkerPosition({
      lat: latValue,
      lng: lngValue,
    });
    setMapPosition({
      lat: latValue,
      lng: lngValue,
    });
  };

  const AsyncMap = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
        google={props.google}
        defaultZoom={props.zoom}
        defaultCenter={{
          lat: mapPosition.lat,
          lng: mapPosition.lng,
        }}
      >
        <InfoWindow
          onClose={onInfoWindowClose}
          position={{
            lat: markerPosition.lat + 0.0018,
            lng: markerPosition.lng,
          }}
        >
          <div>
            <span style={{ padding: 0, margin: 0 }}>{address}</span>
          </div>
        </InfoWindow>
        <Marker
          google={props.google}
          name={'Dolores park'}
          draggable={true}
          onDragEnd={onMarkerDragEnd}
          position={{
            lat: markerPosition.lat,
            lng: markerPosition.lng,
          }}
        />
        <Marker />
        <Autocomplete
          style={{
            width: '100%',
            height: '40px',
            paddingLeft: '16px',
            marginTop: '1vw',
            marginBottom: '500px',
            border: '1px solid black',
            borderRadius: '5px',
          }}
          onPlaceSelected={onPlaceSelected}
          types={['(regions)']}
        />
      </GoogleMap>
    ))
  );

  return (
    <>
      {props.center.lat !== undefined ? (
        <>
          <AddressRow>
            <AddressTitle>地址</AddressTitle>
            <Address
              type="text"
              name="address"
              className="form-control"
              readOnly="readOnly"
              value={address}
            />
          </AddressRow>
          <AsyncMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GoogleMapsAPI}&libraries=places&language=zh-TW`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: props.height }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </>
      ) : (
        <div style={{ height: props.height }} />
      )}
    </>
  );
};

const AddressRow = styled.div``;

const AddressTitle = styled.div`
  margin-bottom: 2vw;
  font-size: 2.5vw;
`;

const Address = styled.textarea`
  width: 100%;
  overflow: hidden;
  margin-bottom: 2vw;
  line-height: 30px;
  border-radius: 5px;
`;

export default Map;
