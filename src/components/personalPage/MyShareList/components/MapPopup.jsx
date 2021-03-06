import { useEffect, useState } from 'react';

import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { DialogOverlay } from '@reach/dialog';

import Loading from '../../../common/Loading';
import MyMap from '../../../common/MyMap';

import {
  StyledDialogContent,
  PopClose,
  ButtonContainer,
  StyleBtnRipples,
  SubmitBtn,
} from '../../../common/popup/PopupUnits';

const MapPopup = ({ showMap, closeMap, handleAddress, handleLatLng }) => {
  const dispatch = useDispatch();
  const [defaultCenter, setDefaultCenter] = useState({
    lat: 25.04267234987771,
    lng: 121.56497334150076,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    if (isMounted) {
      setIsLoading(true);
      const setCurrentLocation = ({ coords }) => {
        setDefaultCenter({
          lat: coords.latitude,
          lng: coords.longitude,
        });
        dispatch({
          type: 'latLng/get',
          payload: [coords.latitude, coords.longitude],
        });
        setIsLoading(false);
      };

      navigator.geolocation.watchPosition(setCurrentLocation, (error) => {
        dispatch({
          type: 'latLng/get',
          payload: [25.04267234987771, 121.56497334150076],
        });
        setIsLoading(false);
      });
    }

    return () => {
      setIsMounted(false);
    };
  }, [dispatch, isMounted]);

  return (
    <DialogOverlay isOpen={showMap} onDismiss={closeMap}>
      <MapStyledDialogContent aria-label="popup">
        {isLoading && <Loading />}
        <PopClose onClick={closeMap} />
        <MyMap
          defaultCenter={defaultCenter}
          handleAddress={handleAddress}
          handleLatLng={handleLatLng}
        />
        <ButtonContainer>
          <StyleBtnRipples color="#fff" during={3000}>
            <SubmitBtn onClick={closeMap}>確認</SubmitBtn>
          </StyleBtnRipples>
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
