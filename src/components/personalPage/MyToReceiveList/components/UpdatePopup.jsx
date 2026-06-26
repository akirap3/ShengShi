import { useState } from 'react';

import Ripples from 'react-ripples';
import styled from 'styled-components';
import { DialogOverlay } from '@reach/dialog';
import { useDispatch, useSelector } from 'react-redux';

import useCurrentUser from '../../../../hooks/useCurrentUser';
import {
  StyledDialogContent,
  PopClose,
  PopTitleContainer,
  TitleIcon,
  PopTitle,
  Preview,
  PopContent,
  PopRow,
  StyledLabel,
  StyledInput,
  StyledSpan,
  LabelIconContainer,
  Calendar,
  PopPlaceIcon,
  ButtonContainer,
  SubmitBtn,
} from '../../../common/popup/PopupUnits';
import LocationMap from '../../../common/MyMap/components/ExchangeMap';
import SelectDateTimePopup from '../../MyCollectedList/components/SelectDateTimePopup';
import AlertPopup from '../../../common/popup/AlertPopup';
import Loading from '../../../common/Loading';
import { onUpdateSubmit } from '../../../../utils/firebase';
import { useTranslation } from '../../../../context/LanguageContext';

const UpdatePopup = ({ showUpdate, closeUpdate, share }) => {
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();
  const [showDateTime, setShowDateTime] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [newQuantities, setNewQuantities] = useState(
    share?.toReceiveInfo[currentUser?.uid]?.quantities || 1
  );
  const specificDateTime = useSelector((state) => state.specificDateTime);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const openDateTime = () => setShowDateTime(true);
  const closeDateTime = () => setShowDateTime(false);
  const openInfo = () => setShowInfo(true);
  const closeInfo = () => setShowInfo(false);

  const openAlertWithMessage = (msg) => {
    setAlertMessage(msg);
    openInfo();
    return false;
  };

  const isFieldsChecked = (share) => {
    const newQty = Number(newQuantities);
    if (isNaN(newQty)) {
      return openAlertWithMessage(t('errQtyFormat'));
    } else if (newQty < 0 || newQty > share.quantities) {
      return openAlertWithMessage(t('qtyRangeMinMax').replace('{max}', share.quantities));
    } else if (specificDateTime === null) {
      return openAlertWithMessage(t('errSelectDateTime'));
    }
    return true;
  };

  const handleReset = () => {
    setIsLoading(false);
    dispatch({ type: 'specificDateTime/selected', payload: null });
    closeUpdate();
  };

  const handleUpdateSubmit = () => {
    const enable = isFieldsChecked(share);
    if (enable) {
      const data = {
        share,
        currentUser,
        newQuantities,
        specificDateTime,
      };
      setIsLoading(true);
      onUpdateSubmit(data).then(() => handleReset());
    }
  };

  return (
    <>
      <DialogOverlay isOpen={showUpdate} onDismiss={closeUpdate}>
        <StyledDialogContent aria-label="popup">
          {isLoading && <Loading />}
          <PopClose onClick={closeUpdate} />
          <PopTitleContainer>
            <TitleIcon />
            <PopTitle>{share?.name || ''}</PopTitle>
          </PopTitleContainer>
          <PopContent>
            <Preview src={share?.imageUrl || ''} />
            <StyledPopRow>
              <StyledLabel>{t('requestedQuantity')}</StyledLabel>
              <StyledInput
                placeholder={
                  share?.toReceiveInfo[currentUser?.uid]?.quantities || ''
                }
                onChange={(e) => setNewQuantities(e.target.value)}
                disabled={isLoading}
              />
            </StyledPopRow>
            <PopRow>
              <StyledLabel>{t('availableTimeRange')}</StyledLabel>
              <StyledSpan>
                {share?.fromTimeStamp.toDate().toLocaleString()}
                {` ~ `}
                {share?.toTimeStamp.toDate().toLocaleString()}
              </StyledSpan>
            </PopRow>
            <PopRow>
              <LabelIconContainer>
                <DateTimeLabel>{t('dateAndTime')}</DateTimeLabel>
                <Calendar onClick={openDateTime} />
              </LabelIconContainer>
              <StyledSpan>
                {specificDateTime ? specificDateTime.toLocaleString() : ''}
              </StyledSpan>
            </PopRow>
            <PopRow>
              <LabelIconContainer>
                <PopPlaceLabel>{t('place')}</PopPlaceLabel>
                <PopPlaceIcon />
              </LabelIconContainer>
              <StyledSpan>{share?.exchangePlace || ''}</StyledSpan>
            </PopRow>
            <MapWrapper>
              <LocationMap />
            </MapWrapper>
            <ButtonContainer>
              <Ripples color="#fff" during={3000}>
                <SubmitBtn onClick={handleUpdateSubmit} disabled={isLoading}>
                  {t('confirmUpdate')}
                </SubmitBtn>
              </Ripples>
            </ButtonContainer>
          </PopContent>
        </StyledDialogContent>
      </DialogOverlay>
      <SelectDateTimePopup
        showDateTime={showDateTime}
        closeDateTime={closeDateTime}
        share={share}
      />
      <AlertPopup
        showInfo={showInfo}
        closeInfo={closeInfo}
        message={alertMessage}
      />
    </>
  );
};

const StyledPopRow = styled(PopRow)`
  margin-top: 15px;
`;

const DateTimeLabel = styled(StyledLabel)`
  margin-right: 10px;
`;

const PopPlaceLabel = styled(StyledLabel)`
  margin-right: 10px;
`;

const MapWrapper = styled.div`
  margin-bottom: 15px;
`;

export default UpdatePopup;
