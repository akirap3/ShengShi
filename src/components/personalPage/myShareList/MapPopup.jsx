import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Loading from '../../common/Loading';
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

  useEffect(() => {
    setIsLoading(true);
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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setCurrentLocation);
    } else {
      dispatch({
        type: 'latLng/get',
        payload: [25.04267234987771, 121.56497334150076],
      });
    }
  }, [dispatch]);

  return (
    <DialogOverlay isOpen={showMap} onDismiss={closeMap}>
      <StyledDialogContent aria-label="popup">
        {isLoading && <Loading />}
        <PopClose onClick={closeMap} />
        <MyMap
          handleAddress={handleAddress}
          handleLatLng={handleLatLng}
          defaultCenter={defaultCenter}
        />
      </StyledDialogContent>
    </DialogOverlay>
  );
};

const StyledDialogContent = styled(DialogContent)`
  position: relative;
  width: 80vw;
  max-width: 800px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 10px;

  [data-reach-dialog-content] {
    padding-bottom: 200px;
  }
`;

const PopClose = styled(AiFillCloseCircle)`
  fill: #1e88e582;
  border-radius: 50%;
  opacity: 0.8;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 22px;
  height: 22px;
`;

export default MapPopup;
