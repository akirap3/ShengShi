import React from 'react';
import styled from 'styled-components';

import { DialogOverlay, DialogContent } from '@reach/dialog';

import FoodImg from '../../../images/homepage/food-5.jpg';
import { AiFillCloseCircle } from 'react-icons/ai';
import { GrLocation } from 'react-icons/gr';
import { BiCrown } from 'react-icons/bi';

const CheckPopup = ({ showEdit, closeEditor }) => {
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
            <PopRow>
              <FoodLabel>食物名稱</FoodLabel>
              <FoodName>非常好吃的蛋糕</FoodName>
            </PopRow>
            <PopRow>
              <QuantityLabel>數量</QuantityLabel>
              <Quantity>5</Quantity>
            </PopRow>
            <PopRow>
              <DateTimeLabel>日期及時間</DateTimeLabel>
              <DateTime>2021-10-15 20:00</DateTime>
            </PopRow>
            <PopRow>
              <PopPlaceLabel>地點</PopPlaceLabel>
              <PopPlace>台北．內湖</PopPlace>
              <PopPlaceIcon />
            </PopRow>
            <PopRow>
              <FoodImgLabel>食物照片</FoodImgLabel>
            </PopRow>
            <PreviewImg src={FoodImg} />
          </PopContent>
        </DialogContent>
      </DialogOverlay>
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

const FoodLabel = styled.label`
  width: 9vw;
`;

const FoodName = styled.span`
  flex-grow: 1;
`;

const QuantityLabel = styled.label`
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

const FoodImgLabel = styled.label`
  width: 9vw;
`;

const PreviewImg = styled.img`
  border-radius: 10px;
  margin-bottom: 2vw;
`;

export default CheckPopup;
