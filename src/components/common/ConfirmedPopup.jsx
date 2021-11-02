import styled from 'styled-components';

import { DialogOverlay, DialogContent } from '@reach/dialog';
import LocationMap from './LocationMap';
import MyQRcode from './MyQRcode';
import UpdatePopup from '../personalPage/myToReceiveList/UpdatePopup';

import { AiFillCloseCircle } from 'react-icons/ai';
import { GrLocation } from 'react-icons/gr';
import { BiCrown } from 'react-icons/bi';
import { useState } from 'react';
import useCurrentUser from '../../hooks/useCurrentUser';

const ConfirmedPopup = ({
  showConfirmation,
  closeConfirmation,
  UpdateBtn,
  share,
}) => {
  const [showUpdate, setShowUpdate] = useState(false);
  const currentUser = useCurrentUser();

  const openUpdate = () => setShowUpdate(true);
  const closeUpdate = () => setShowUpdate(false);

  const handleShowUpdate = () => {
    openUpdate();
    closeConfirmation();
  };

  return (
    <>
      <DialogOverlay isOpen={showConfirmation} onDismiss={closeConfirmation}>
        <DialogContent
          style={{
            position: 'relative',
            border: 'solid 1px lightBlue',
            borderRadius: '10px',
          }}
          aria-label="confirmed-popup"
        >
          <PopClose onClick={closeConfirmation} />
          <PopTitleContainer>
            <CrownIcon />
            <PopTitle>{share?.name || ''}</PopTitle>
          </PopTitleContainer>
          <PopContent>
            <PreviewImg src={share?.imageUrl || ''} />
            <PopRow>
              <RegisterQuantityLabel>登記數量</RegisterQuantityLabel>
              <Quantity>
                {share?.toReceiveInfo[currentUser.uid]?.quantities || 0}
              </Quantity>
            </PopRow>
            <PopRow>
              <DateTimeLabel>領取日期及時間</DateTimeLabel>
              <DateTime>
                {share?.toReceiveInfo[currentUser.uid]?.upcomingTimestamp
                  ?.toDate()
                  .toLocaleString()}
              </DateTime>
            </PopRow>
            <PopRow>
              <PopPlaceLabel>地點</PopPlaceLabel>
              <PopPlace>{share?.exchangePlace || ''}</PopPlace>
              <PopPlaceIcon />
            </PopRow>

            <MapWrapper>
              <LocationMap exchangeLocation={share?.exchangeLocation} />
            </MapWrapper>
            <QRcodeWrapper>
              <StyledQRcode info={`${share?.id}/${currentUser.uid}`} />
            </QRcodeWrapper>
            {UpdateBtn && (
              <UpdateBtn onClick={() => handleShowUpdate()}>我要更新</UpdateBtn>
            )}
          </PopContent>
        </DialogContent>
      </DialogOverlay>
      <UpdatePopup
        showUpdate={showUpdate}
        closeUpdate={closeUpdate}
        share={share}
      />
    </>
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

const PopTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 1vw;
  border-bottom: 1px solid lightskyblue;
`;

const CrownIcon = styled(BiCrown)`
  fill: lightskyblue;
  width: 3vw;
  height: 3vw;
  margin-right: 2vw;
`;

const PopTitle = styled.div`
  font-size: 2.5vw;
`;

const PopContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2vw 1.5vw;
`;

const PopRow = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  font-size: 1.5vw;
  margin-bottom: 2vw;
`;

const RegisterQuantityLabel = styled.label`
  width: 9vw;
`;

const Quantity = styled.span``;

const DateTimeLabel = styled.label`
  width: 9vw;
`;

const DateTime = styled.span`
  margin-right: 1vw;
`;

const PopPlaceLabel = styled.label`
  width: 9vw;
`;

const PopPlace = styled.span`
  margin-right: 1vw;
`;

const PopPlaceIcon = styled(GrLocation)`
  width: 2vw;
  height: 2vw;
`;

const PreviewImg = styled.img`
  border-radius: 10px;
  margin-bottom: 2vw;
`;

const MapWrapper = styled.div`
  margin-bottom: 2vw;
`;

const QRcodeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledQRcode = styled(MyQRcode)``;

export default ConfirmedPopup;
