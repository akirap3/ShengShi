import { useState } from 'react';
import styled from 'styled-components';

import { DialogOverlay, DialogContent } from '@reach/dialog';
import SelectDateTimePopup from './SelectDateTimePopup';
import LocationMap from '../../common/LocationMap';
import ConfirmedPopup from '../../common/ConfirmedPopup';

import FoodImg from '../../../images/homepage/food-5.jpg';
import { AiFillCloseCircle } from 'react-icons/ai';
import { GrLocation } from 'react-icons/gr';
import { BiCrown } from 'react-icons/bi';
import { BsCalendarCheckFill } from 'react-icons/bs';

const CollectedSharePopup = ({ showEdit, closeEditor }) => {
  const [showDateTime, setShowDateTime] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const openDateTime = () => setShowDateTime(true);
  const closeDateTime = () => setShowDateTime(false);
  const openConfirmation = () => setShowConfirmation(true);
  const closeConfirmation = () => setShowConfirmation(false);

  const handelConfirmation = () => {
    openConfirmation();
    closeEditor();
  };

  return (
    <>
      <DialogOverlay isOpen={showEdit} onDismiss={closeEditor}>
        <DialogContent
          style={{
            position: 'relative',
            border: 'solid 1px lightBlue',
            borderRadius: '10px',
          }}
        >
          <PopClose onClick={closeEditor} />
          <PopTitleContainer>
            <CrownIcon />
            <PopTitle>好吃的麵包</PopTitle>
          </PopTitleContainer>
          <PopContent>
            <PreviewImg src={FoodImg} />
            <PopRow>
              <CurrentNumberLabel>目前數量</CurrentNumberLabel>
              <CurrentNumber>5</CurrentNumber>
            </PopRow>
            <PopRow>
              <RegisterQuantityLabel>登記數量</RegisterQuantityLabel>
              <Quantity placeholder="請輸入數量" />
            </PopRow>
            <PopRow>
              <DateTimeLabel>領取日期及時間</DateTimeLabel>
              <DateTime>2021-10-15 20:00</DateTime>
              <Calendar onClick={openDateTime} />
            </PopRow>
            <PopRow>
              <PopPlaceLabel>地點</PopPlaceLabel>
              <PopPlace>台北．內湖</PopPlace>
              <PopPlaceIcon />
            </PopRow>
            <MapWrapper>
              <LocationMap />
            </MapWrapper>
            <SubmitBtn onClick={() => handelConfirmation()}>確認領取</SubmitBtn>
          </PopContent>
        </DialogContent>
      </DialogOverlay>
      <SelectDateTimePopup
        showDateTime={showDateTime}
        closeDateTime={closeDateTime}
      />
      <ConfirmedPopup
        showConfirmation={showConfirmation}
        closeConfirmation={closeConfirmation}
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

const CurrentNumberLabel = styled.label`
  width: 9vw;
`;

const CurrentNumber = styled.span`
  flex-grow: 1;
`;

const RegisterQuantityLabel = styled.label`
  width: 9vw;
`;

const Quantity = styled.input``;

const DateTimeLabel = styled.label`
  width: 9vw;
`;

const DateTime = styled.span`
  margin-right: 1vw;
`;

const Calendar = styled(BsCalendarCheckFill)`
  width: 2vw;
  height: 2vw;
  fill: lightseagreen;
  cursor: pointer;
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

const SubmitBtn = styled.button`
  flex-grow: 1;
  border: none;
  border-radius: 5px;
  background-color: lightskyblue;
  color: white;
  cursor: pointer;
  padding: 1vw;
  letter-spacing: 0.5vw;
`;

const MapWrapper = styled.div`
  margin-bottom: 2vw;
`;

export default CollectedSharePopup;
