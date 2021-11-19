import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Loading from '../../common/Loading';
import { useDispatch } from 'react-redux';

import { DialogOverlay } from '@reach/dialog';

import {
  StyledDialogContent,
  PopClose,
  ButtonContainer,
  SubmitBtn,
} from '../../common/popup/PopupUnits';

import MyMap from '../../common/myMap/Mymap';

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
      <MapStyledDialogContent aria-label="popup">
        {isLoading && <Loading />}
        <PopClose onClick={closeMap} />
        <MyMap
          handleAddress={handleAddress}
          handleLatLng={handleLatLng}
          defaultCenter={defaultCenter}
        />
        <ButtonContainer>
          <SubmitBtn onClick={closeMap}>確認</SubmitBtn>
        </ButtonContainer>
      </MapStyledDialogContent>
    </DialogOverlay>
  );
};

const MapStyledDialogContent = styled(StyledDialogContent)`
  [data-reach-dialog-content] {
    padding-bottom: 200px;
  }
`;

export default MapPopup;
