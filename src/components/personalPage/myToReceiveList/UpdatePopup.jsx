import { useState } from 'react';
import styled from 'styled-components';

import { DialogOverlay, DialogContent } from '@reach/dialog';
import LocationMap from '../../common/LocationMap';

import FoodImg from '../../../images/homepage/food-5.jpg';
import { AiFillCloseCircle } from 'react-icons/ai';
import { GrLocation } from 'react-icons/gr';
import { BiCrown } from 'react-icons/bi';
import { BsCalendarCheckFill } from 'react-icons/bs';

import SelectDateTimePopup from '../myCollectedList/SelectDateTimePopup';

const UpdatePopup = ({ showUpdate, closeUpdate }) => {
  const [showDateTime, setShowDateTime] = useState(false);

  const openDateTime = () => setShowDateTime(true);
  const closeDateTime = () => setShowDateTime(false);

  const handleUpdate = () => {
    closeUpdate();
  };
  return (
    <>
      <DialogOverlay isOpen={showUpdate} onDismiss={closeUpdate}>
        <DialogContent
          style={{
            position: 'relative',
            border: 'solid 1px lightBlue',
            borderRadius: '10px',
          }}
        >
          <PopClose onClick={closeUpdate} />
          <PopTitleContainer>
            <CrownIcon />
            <PopTitle>好吃的麵包</PopTitle>
          </PopTitleContainer>
          <PopContent>
            <PreviewImg src={FoodImg} />
            <PopRow>
              <RegisterQuantityLabel>登記數量</RegisterQuantityLabel>
              <Quantity />
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
            <SubmitBtn onClick={() => handleUpdate()}>確認更新</SubmitBtn>
          </PopContent>
        </DialogContent>
      </DialogOverlay>
      <SelectDateTimePopup
        showDateTime={showDateTime}
        closeDateTime={closeDateTime}
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

const MapWrapper = styled.div`
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

export default UpdatePopup;
