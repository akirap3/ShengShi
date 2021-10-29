import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactLoading from 'react-loading';
import { useDispatch } from 'react-redux';

import { DialogOverlay, DialogContent } from '@reach/dialog';
import '@reach/dialog/styles.css';

import MyMap from '../../common/myMap/Mymap';

import { AiFillCloseCircle } from 'react-icons/ai';

const MapPopup = ({ showMap, closeMap, handleAddress, handleLatLng }) => {
  const dispatch = useDispatch();
  const [defaultCenter, setDefaultCenter] = useState({
    lat: 25.04267234987771,
    lng: 121.56497334150076,
  });
  const [isLoading, setIsLoading] = useState(false);

  const setCurrentLocation = (position) => {
    setDefaultCenter({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
    dispatch({
      type: 'latLng/get',
      payload: [position.coords.latitude, position.coords.longitude],
    });
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setCurrentLocation);
    } else {
      dispatch({
        type: 'latLng/get',
        payload: [25.04267234987771, 121.56497334150076],
      });
    }
  }, []);

  return (
    <DialogOverlay isOpen={showMap} onDismiss={closeMap}>
      {isLoading && (
        <StyledLoading
          type={'spin'}
          color={'#2a9d8f'}
          height={'10vw'}
          width={'10vw'}
        />
      )}
      <DialogContent
        style={{
          position: 'relative',
          border: 'solid 1px lightBlue',
          borderRadius: '10px',
          width: '80vw',
          padding: '0%',
        }}
      >
        <PopClose onClick={closeMap} />
        <MyMap
          handleAddress={handleAddress}
          handleLatLng={handleLatLng}
          defaultCenter={defaultCenter}
        />
      </DialogContent>
    </DialogOverlay>
  );
};

const StyledColse = styled(AiFillCloseCircle)`
  fill: lightblue;
  background-color: blue;
  border-radius: 50%;
  opacity: 0.8;
  cursor: pointer;
`;

const PopClose = styled(StyledColse)`
  position: absolute;
  top: 2vw;
  right: 2vw;
  width: 3vw;
  height: 3vw;
  cursor: pointer;
`;

const StyledLoading = styled(ReactLoading)`
  display: flex;
  position: absolute;
  z-index: 10;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
`;

export default MapPopup;
