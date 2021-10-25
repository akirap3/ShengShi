import React from 'react';
import styled from 'styled-components';

import { themeColor } from '../../utils/commonVariables';

import '@reach/dialog/styles.css';

import Img from '../../images/restaurantPage/restaurant-8.jpg';
import { ImSpoonKnife } from 'react-icons/im';
import {
  AiTwotoneStar,
  AiTwotoneHeart,
  AiFillCloseCircle,
} from 'react-icons/ai';
import { GrLocation } from 'react-icons/gr';

const ShareCard = ({ openEditor }) => {
  return (
    <SharesContainer>
      <ShareContext>
        <ShareImg src={Img} />
        <CardContent>
          <ShareTitle>好吃的麵包</ShareTitle>
          <DeleteButton />
          <CardRow>
            <CardItem>
              <ShareNameIcon />
              <ShareUseName>麵包超人</ShareUseName>
            </CardItem>
            <CardItem>
              <Star />
              <Rating>5</Rating>
            </CardItem>
            <Heart />
          </CardRow>
          <CardRow>
            <CardItem>
              <PlaceIcon />
              <Location>台北 板橋</Location>
            </CardItem>
            <GetButton onClick={openEditor}>編輯</GetButton>
          </CardRow>
        </CardContent>
      </ShareContext>
    </SharesContainer>
  );
};

const SharesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  gap: 2rem;
  padding: 3vw 4rem;
  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const ShareContext = styled.div`
  display: flex;
  border: 1px solid black;
  border-radius: 10px;
`;

const ShareImg = styled.img`
  max-width: 15vw;
  border-radius: 10px 0 0 10px;
  @media screen and (max-width: 700px) {
    max-width: 30vw;
  }
  @media screen and (max-width: 460px) {
    max-width: 25vw;
  }
`;

const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  font-size: 1.5vw;
  &:nth-child(2) {
    margin-bottom: 1vw;
  }

  @media screen and (max-width: 800px) {
    &:nth-child(3) {
      flex-wrap: wrap;
    }
  }

  @media screen and (max-width: 700px) {
    font-size: 2.6vw;
    &:nth-child(2) {
      margin-bottom: 1vw;
    }
  }
`;

const CardItem = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

const CardContent = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  padding: 2vw 1.5vw;
  flex-grow: 1;
  @media screen and (max-width: 700px) {
    padding: 3.5vw 3vw;
  }
`;

const ShareTitle = styled.h2`
  font-size: 2vw;
  margin-bottom: 2vw;
  @media screen and (max-width: 700px) {
    font-size: 3vw;
    margin-bottom: 2vw;
  }
  @media screen and (max-width: 460px) {
    font-size: 3.5vw;
    margin-bottom: 3vw;
  }
`;

const ShareNameIcon = styled(ImSpoonKnife)`
  fill: ${themeColor.iconColor};
  margin-right: 1vw;
  width: 1.8vw;
  height: 1.8vw;
  @media screen and (max-width: 700px) {
    width: 2.6vw;
    height: 2.6vw;
  }
`;

const ShareUseName = styled.span``;

const StyledColse = styled(AiFillCloseCircle)`
  fill: lightblue;
  background-color: blue;
  border-radius: 50%;
  opacity: 0.8;
  cursor: pointer;
`;

const DeleteButton = styled(StyledColse)`
  position: absolute;
  top: -1.2vw;
  right: -1.2vw;
  width: 3vw;
  height: 3vw;

  @media screen and (max-width: 700px) {
    width: 4vw;
    height: 4vw;
    top: -2vw;
    right: -2vw;
  }
`;

const Star = styled(AiTwotoneStar)`
  fill: orchid;
  margin-right: 1vw;
  width: 1.8vw;
  height: 1.8vw;
  @media screen and (max-width: 700px) {
    width: 2.6vw;
    height: 2.6vw;
  }
`;

const Rating = styled.span``;

const Heart = styled(AiTwotoneHeart)`
  fill: red;
  width: 1.8vw;
  height: 1.8vw;
  @media screen and (max-width: 700px) {
    width: 2.6vw;
    height: 2.6vw;
  }
`;

const PlaceIcon = styled(GrLocation)`
  margin-right: 1vw;
  width: 1.8vw;
  height: 1.8vw;
`;

const Location = styled.span``;

const GetButton = styled.div`
  border: 1px solid ${themeColor.outLineColor};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background-color: #2a9d8f;
  color: white;
  cursor: pointer;

  @media screen and (max-width: 860px) {
    padding: 0.3rem 0.5rem;
  }

  @media screen and (max-width: 800px) {
    margin-top: 0.5rem;
  }
`;

export default ShareCard;
