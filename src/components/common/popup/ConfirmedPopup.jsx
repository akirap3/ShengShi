import { useState } from 'react';

import Ripples from 'react-ripples';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { DialogOverlay } from '@reach/dialog';

import useCurrentUser from '../../../hooks/useCurrentUser';
import UpdatePopup from '../../personalPage/MyToReceiveList/components/UpdatePopup';
import LocationMap from '../MyMap/components/ExchangeMap';
import MyQRcode from '../MyQRcode';
import {
  StyledDialogContent,
  PopClose,
  PopTitleContainer,
  TitleIcon,
  PopTitle,
  PopContent,
  PopRow,
  StyledLabel,
  StyledSpan,
  LabelIconContainer,
  PopPlaceIcon,
  Preview,
  ButtonContainer,
  SubmitBtn,
} from './PopupUnits';

const ConfirmedPopup = ({
  showConfirmation,
  closeConfirmation,
  hasUpdateBtn,
  share,
}) => {
  const dispatch = useDispatch();
  const [showUpdate, setShowUpdate] = useState(false);
  const currentUser = useCurrentUser();

  const openUpdate = () => setShowUpdate(true);
  const closeUpdate = () => setShowUpdate(false);

  const handleShowUpdate = (share) => {
    dispatch({
      type: 'specificDateTime/selected',
      payload:
        share?.toReceiveInfo[currentUser?.uid]?.upcomingTimestamp?.toDate(),
    });
    openUpdate();
    closeConfirmation();
  };

  return (
    <>
      <DialogOverlay isOpen={showConfirmation} onDismiss={closeConfirmation}>
        <StyledDialogContent aria-label="confirmed-popup">
          <PopClose onClick={closeConfirmation} />
          <PopTitleContainer>
            <TitleIcon />
            <PopTitle>{share?.name || ''}</PopTitle>
          </PopTitleContainer>
          <PopContent>
            <Preview src={share?.imageUrl || ''} />
            <StyledPopRow>
              <StyledLabel>登記數量</StyledLabel>
              <StyledSpan>
                {share?.toReceiveInfo[currentUser?.uid]?.quantities || 0}
              </StyledSpan>
            </StyledPopRow>
            <PopRow>
              <StyledLabel>領取日期及時間</StyledLabel>
              <StyledSpan>
                {share?.toReceiveInfo[currentUser?.uid]?.upcomingTimestamp
                  ?.toDate()
                  .toLocaleString()}
              </StyledSpan>
            </PopRow>
            <PopRow>
              <LabelIconContainer>
                <StyledLabel>地點</StyledLabel>
                <PopPlaceIcon />
              </LabelIconContainer>

              <StyledSpan>{share?.exchangePlace || ''}</StyledSpan>
            </PopRow>
            <MapQRContainer>
              <MapWrapper>
                <LocationMap exchangeLocation={share?.exchangeLocation} />
              </MapWrapper>
              <QRcodeWrapper>
                <MyQRcode info={`${share?.id}/${currentUser?.uid}`} />
              </QRcodeWrapper>
            </MapQRContainer>
            <ButtonContainer>
              {hasUpdateBtn && (
                <Ripples color="#fff" during={3000}>
                  <SubmitBtn onClick={() => handleShowUpdate(share)}>
                    我要更新
                  </SubmitBtn>
                </Ripples>
              )}
            </ButtonContainer>
          </PopContent>
        </StyledDialogContent>
      </DialogOverlay>
      <UpdatePopup
        showUpdate={showUpdate}
        closeUpdate={closeUpdate}
        share={share}
      />
    </>
  );
};

const StyledPopRow = styled(PopRow)`
  margin-top: 20px;
`;

const MapQRContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 700px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const MapWrapper = styled.div`
  margin-bottom: 15px;
  @media screen and (min-width: 700px) {
    width: calc(100% - 220px);
    margin-bottom: 0;
  }
`;

const QRcodeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ConfirmedPopup;
