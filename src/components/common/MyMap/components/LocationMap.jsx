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
import { HiLocationMarker } from 'react-icons/hi';

require('dotenv').config();
const GoogleMapsAPI = process.env.REACT_APP_GOOGLE_API_KEY;

Geocode.setApiKey(GoogleMapsAPI);
Geocode.setLanguage('zh-TW');
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
    Geocode.fromLatLng(
      this.state.mapPosition.lat,
      this.state.mapPosition.lng
    ).then(
      (response) => {
        const address = response.results[0].formatted_address;
        this.props.handleAddress(address);
        this.props.handleLatLng([
          this.state.mapPosition.lat,
          this.state.mapPosition.lng,
        ]);
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
    if (place['formatted_address'] === undefined) {
      alert(
        '請選擇有搜尋出的地址或使用拖拉 Marker 來取得地址(本站僅提供台灣的地址搜尋)'
      );
    } else {
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
    }
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
              marginTop: '10px',
              border: '1px solid grey',
              borderRadius: '5px',
            }}
            onPlaceSelected={this.onPlaceSelected}
            placeholder="地址搜尋"
            options={{
              types: ['geocode'],
              componentRestrictions: { country: 'TW' },
            }}
          />
        </GoogleMap>
      ))
    );
    let map;
    if (this.props.center.lat !== undefined) {
      map = (
        <>
          <AddressRow>
            <PopPlaceIcon />
            <AddressTitle>地址</AddressTitle>
          </AddressRow>
          <Address
            type="text"
            name="address"
            className="form-control"
            onChange={this.onChange}
            readOnly="readOnly"
            value={this.state.address}
          />
          <AsyncMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GoogleMapsAPI}&libraries=places&language=zh-TW`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: this.props.height }} />}
            mapElement={<div style={{ height: `85%`, borderRadius: '5px' }} />}
          />
        </>
      );
    } else {
      map = <div style={{ height: this.props.height }} />;
    }
    return map;
  }
}

const AddressRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #52b788;
  border-radius: 10px;
  margin-bottom: 20px;
  margin-top: 10px;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
`;

const PopPlaceIcon = styled(HiLocationMarker)`
  fill: #95d5b2;
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const AddressTitle = styled.div`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 24px;
  color: white;
`;

const Address = styled.textarea`
  width: 100%;
  overflow: hidden;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 24px;
  font-size: 16px;
  margin-bottom: 10px;
  border-radius: 5px;
  text-align: center;
  padding: 20px 5px 10px 5px;
  line-height: 20px;
  border: 1px solid rgb(229, 229, 229);
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
`;

export default Map;
