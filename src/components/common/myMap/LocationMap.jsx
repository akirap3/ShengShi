import React, { Component } from 'react';
import styled from 'styled-components';

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

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      mapPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng,
      },
      markerPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng,
      },
    };
  }

  componentDidMount() {
    this.props.handleLatLng([
      this.state.mapPosition.lat,
      this.state.mapPosition.lng,
    ]);
    Geocode.fromLatLng(
      this.state.mapPosition.lat,
      this.state.mapPosition.lng
    ).then(
      (response) => {
        const address = response.results[0].formatted_address;
        this.props.handleAddress(address);
        this.setState({
          address: address ? address : '',
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.markerPosition.lat !== this.props.center.lat ||
      this.state.address !== nextState.address
    ) {
      return true;
    } else if (this.props.center.lat === nextProps.center.lat) {
      return false;
    }
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onInfoWindowClose = (event) => {};

  onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng();

    Geocode.fromLatLng(newLat, newLng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        this.props.handleAddress(address);
        this.props.handleLatLng([newLat, newLng]);
        this.setState({
          address: address ? address : '',
          markerPosition: {
            lat: newLat,
            lng: newLng,
          },
          mapPosition: {
            lat: newLat,
            lng: newLng,
          },
        });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  onPlaceSelected = (place) => {
    console.log('plc', place);
    const address = place.formatted_address,
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();
    this.props.handleAddress(address);
    this.setState({
      address: address ? address : '',
      markerPosition: {
        lat: latValue,
        lng: lngValue,
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue,
      },
    });
  };

  render() {
    const AsyncMap = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          google={this.props.google}
          defaultZoom={this.props.zoom}
          defaultCenter={{
            lat: this.state.mapPosition.lat,
            lng: this.state.mapPosition.lng,
          }}
        >
          <InfoWindow
            onClose={this.onInfoWindowClose}
            position={{
              lat: this.state.markerPosition.lat + 0.0018,
              lng: this.state.markerPosition.lng,
            }}
          >
            <div>
              <span style={{ padding: 0, margin: 0 }}>
                {this.state.address}
              </span>
            </div>
          </InfoWindow>
          <Marker
            google={this.props.google}
            draggable={true}
            onDragEnd={this.onMarkerDragEnd}
            position={{
              lat: this.state.markerPosition.lat,
              lng: this.state.markerPosition.lng,
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
            onPlaceSelected={this.onPlaceSelected}
            placeholder="查詢區域"
            types={['(regions)']}
          />
        </GoogleMap>
      ))
    );
    let map;
    if (this.props.center.lat !== undefined) {
      map = (
        <>
          <AddressRow>
            <AddressTitle>地址</AddressTitle>
            <Address
              type="text"
              name="address"
              className="form-control"
              onChange={this.onChange}
              readOnly="readOnly"
              value={this.state.address}
            />
          </AddressRow>
          <AsyncMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GoogleMapsAPI}&libraries=places&language=zh-TW`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: this.props.height }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </>
      );
    } else {
      map = <div style={{ height: this.props.height }} />;
    }
    return map;
  }
}

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
