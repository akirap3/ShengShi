import { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { DialogOverlay } from '@reach/dialog';
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
} from '../../common/popup/PopupUnits';
import LocationMap from '../../common/LocationMap';
import Loading from '../../common/Loading';

import { getFirestore, doc, updateDoc, Timestamp } from '@firebase/firestore';

import SelectDateTimePopup from '../myCollectedList/SelectDateTimePopup';
import AlertPopup from '../../common/AlertPopup';

import useCurrentUser from '../../../hooks/useCurrentUser';

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

  const openDateTime = () => setShowDateTime(true);
  const closeDateTime = () => setShowDateTime(false);
  const openInfo = () => setShowInfo(true);
  const closeInfo = () => setShowInfo(false);

  const handleSpecificDateTime = (payload) => {
    dispatch({ type: 'specificDateTime/selected', payload: payload });
  };

  const isFieldsChecked = (share) => {
    const newQty = Number(newQuantities);
    if (isNaN(newQty)) {
      setAlertMessage('數量請輸入數字');
      openInfo();
      return false;
    } else if (newQty < 0 || newQty > share.quantities) {
      setAlertMessage(`請輸入介於 1 ~ ${share.quantities} 的數字`);
      openInfo();
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (isFieldsChecked(share)) {
      setIsLoading(true);
      const docRef = doc(getFirestore(), 'shares', share.id);
      const updateQuantities = `toReceiveInfo.${currentUser.uid}.quantities`;
      const updateUpcomingTimestamp = `toReceiveInfo.${currentUser.uid}.upcomingTimestamp`;
      await updateDoc(docRef, {
        [updateQuantities]: newQuantities,
        [updateUpcomingTimestamp]: Timestamp.fromDate(specificDateTime),
      });
      setIsLoading(false);
      handleSpecificDateTime(null);
      closeUpdate();
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
              <RegisterQuantityLabel>登記數量</RegisterQuantityLabel>
              <Quantity
                placeholder={
                  share?.toReceiveInfo[currentUser?.uid]?.quantities || ''
                }
                onChange={(e) => setNewQuantities(e.target.value)}
                disabled={isLoading}
              />
            </StyledPopRow>
            <PopRow>
              <AvailableDateTimeLabel>可領取期間</AvailableDateTimeLabel>
              <AvailableDateTime>
                {share?.fromTimeStamp.toDate().toLocaleString()}
                {` - `}
                {share?.toTimeStamp.toDate().toLocaleString()}
              </AvailableDateTime>
            </PopRow>
            <PopRow>
              <LabelIconContainer>
                <DateTimeLabel>領取日期及時間</DateTimeLabel>
                <Calendar onClick={openDateTime} />
              </LabelIconContainer>
              <DateTime>
                {specificDateTime?.toLocaleString() ||
                  share?.toReceiveInfo[currentUser?.uid]?.upcomingTimestamp
                    ?.toDate()
                    .toLocaleString()}
              </DateTime>
            </PopRow>
            <PopRow>
              <LabelIconContainer>
                <PopPlaceLabel>地點</PopPlaceLabel>
                <PopPlaceIcon />
              </LabelIconContainer>
              <PopPlace>{share?.exchangePlace || ''}</PopPlace>
            </PopRow>
            <MapWrapper>
              <LocationMap />
            </MapWrapper>
            <ButtonContainer>
              <SubmitBtn onClick={() => handleSubmit()} disabled={isLoading}>
                確認更新
              </SubmitBtn>
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

const RegisterQuantityLabel = styled(StyledLabel)``;

const Quantity = styled(StyledInput)``;

const AvailableDateTimeLabel = styled(StyledLabel)``;

const AvailableDateTime = styled(StyledSpan)``;

const DateTimeLabel = styled(StyledLabel)`
  margin-right: 10px;
`;

const DateTime = styled(StyledSpan)``;

const PopPlaceLabel = styled(StyledLabel)`
  margin-right: 10px;
`;

const PopPlace = styled(StyledSpan)``;

const MapWrapper = styled.div`
  margin-bottom: 15px;
`;

export default UpdatePopup;
