import { useEffect } from 'react';

import Ripples from 'react-ripples';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { DialogOverlay } from '@reach/dialog';

import MyMap from '../../../common/MyMap';

import {
  StyledDialogContent,
  PopClose,
  ButtonContainer,
  SubmitBtn,
} from '../../../common/popup/PopupUnits';
import { useTranslation } from '../../../../context/LanguageContext';

const MapPopup = ({ showMap, closeMap, handleAddress, handleLatLng }) => {
  const dispatch = useDispatch();
  const defaultCenter = {
    lat: 25.04267234987771,
    lng: 121.56497334150076,
  };
  const { t } = useTranslation();

  useEffect(() => {
    dispatch({
      type: 'latLng/get',
      payload: [25.04267234987771, 121.56497334150076],
    });
  }, [dispatch]);

  return (
    <DialogOverlay isOpen={showMap} onDismiss={closeMap}>
      <MapStyledDialogContent aria-label="popup">
        <PopClose onClick={closeMap} />
        <MyMap
          defaultCenter={defaultCenter}
          handleAddress={handleAddress}
          handleLatLng={handleLatLng}
        />
        <ButtonContainer>
          <Ripples color="#fff" during={3000}>
            <SubmitBtn onClick={closeMap}>{t('confirm')}</SubmitBtn>
          </Ripples>
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
