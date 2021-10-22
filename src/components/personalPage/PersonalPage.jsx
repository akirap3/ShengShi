import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { themeColor } from '../../utils/commonVariables';
import Main from '../common/Main';

import Img from '../../images/restaurantPage/restaurant-8.jpg';
import MemberImg from '../../images/PersonalPage/user-9.jpg';
import Hotpot from '../../images/searchPage/hotpot.svg';
import { ImSpoonKnife } from 'react-icons/im';
import { AiTwotoneStar, AiTwotoneHeart } from 'react-icons/ai';
import { GrLocation } from 'react-icons/gr';
import { IoMdPerson } from 'react-icons/io';
import { BsGear } from 'react-icons/bs';

const SearchPage = () => {
  return (
    <Main>
      <DashboardContainer>
        <DashboardContext>
          <LeftColumn>
            <PersonalAvatar src={MemberImg} />
            <PersonalNameContext>
              <AliasIcon />
              <UserName>剩食達人</UserName>
            </PersonalNameContext>
          </LeftColumn>
          <PersonalDetails>
            <PersonalRow>
              <PersoanlUsernameIcon />
              <PersonalUserName>John Chen</PersonalUserName>
              <PersonalSetting />
            </PersonalRow>
            <PersonalRow>
              <PersonalStar />
              <PersonalRating>5</PersonalRating>
            </PersonalRow>
            <PersonalRow>
              <PersonalPlaceIcon />
              <PersonalPlace>台北 內湖</PersonalPlace>
            </PersonalRow>
          </PersonalDetails>
          <PersonalGrid>
            <PersonalButton>
              <PersonalButtonName>我的清單</PersonalButtonName>
              <PersonalItemNumber>10</PersonalItemNumber>
            </PersonalButton>
            <PersonalButton>
              <PersonalButtonName>我的勳章</PersonalButtonName>
              <PersonalItemNumber>3</PersonalItemNumber>
            </PersonalButton>
            <PersonalButton>
              <PersonalButtonName>領取紀錄</PersonalButtonName>
              <PersonalItemNumber>10</PersonalItemNumber>
            </PersonalButton>
            <PersonalButton>
              <PersonalButtonName>尚未領取</PersonalButtonName>
              <PersonalItemNumber>10</PersonalItemNumber>
            </PersonalButton>
            <PersonalButton>
              <PersonalButtonName>收藏清單</PersonalButtonName>
              <PersonalItemNumber>10</PersonalItemNumber>
            </PersonalButton>
            <PersonalButton>
              <PersonalButtonName>收藏店家</PersonalButtonName>
              <PersonalItemNumber>10</PersonalItemNumber>
            </PersonalButton>
          </PersonalGrid>
          <PersonalCheckButton>查看他人的分享</PersonalCheckButton>
          <PersonalShareButton>我要分享勝食</PersonalShareButton>
        </DashboardContext>
      </DashboardContainer>
      <SharesTitleContainer>
        <TitleIcon src={Hotpot} />
        <SharesTitle>我的分享清單</SharesTitle>
      </SharesTitleContainer>
      <SharesContext>
        <ShareCard>
          <ShareImg src={Img} />
          <CardContent>
            <ShareTitle>好吃的麵包</ShareTitle>
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
              <GetButton>編輯</GetButton>
            </CardRow>
          </CardContent>
        </ShareCard>
      </SharesContext>
    </Main>
  );
};

const DashboardContainer = styled.div`
  display: flex;
  padding: 2rem 4rem;
`;

const DashboardContext = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto;
  grid-template-areas: 'leftColumn personDetals personDetals  personalGrid personalGrid personalGrid ' 'leftColumn   personDetals personDetals  personalGrid personalGrid personalGrid  ' 'leftColumn  personalCheckButton personalCheckButton   personalShareButton personalShareButton personalShareButton ';
  gap: 1vw;
  border: 1px solid black;
  border-radius: 10px;
  flex-grow: 1;
  padding: 3vw;

  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: 'leftColumn personDetals' 'personalGrid personalGrid' 'personalCheckButton personalCheckButton' 'personalShareButton personalShareButton';
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-area: leftColumn;
`;

const PersonalAvatar = styled.img`
  max-width: 15vw;
  border-radius: 50%;
`;

const PersonalNameContext = styled.div`
  display: flex;
  margin-top: 1vw;
  @media screen and (max-width: 700px) {
    margin-top: 2vw;
  }
`;

const AliasIcon = styled(ImSpoonKnife)`
  margin-right: 1.5vw;
  width: 1.8vw;
  height: 1.8vw;

  @media screen and (max-width: 700px) {
    margin-right: 2vw;
    width: 2.5vw;
    height: 2.5vw;
  }
`;

const UserName = styled.span`
  font-size: 1.8vw;
  @media screen and (max-width: 700px) {
    font-size: 2.5vw;
  }
`;

const PersonalDetails = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.8vw;
  grid-area: personDetals;
  flex-grow: 1;
  margin-top: 1vw;

  @media screen and (max-width: 700px) {
    font-size: 2.5vw;
  }
`;

const PersonalRow = styled.div`
  display: flex;
  flex-grow: 1;
`;

const PersoanlUsernameIcon = styled(IoMdPerson)`
  margin-right: 1.5vw;
  width: 1.8vw;
  height: 1.8vw;
  @media screen and (max-width: 700px) {
    margin-right: 2vw;
    width: 2.5vw;
    height: 2.5vw;
  }
`;

const PersonalUserName = styled.span`
  margin-right: 1.5vw;
`;

const PersonalSetting = styled(BsGear)`
  width: 1.8vw;
  height: 1.8vw;
  @media screen and (max-width: 700px) {
    margin-left: 2vw;
    width: 2.5vw;
    height: 2.5vw;
  }
`;

const PersonalStar = styled(AiTwotoneStar)`
  margin-right: 1.5vw;
  width: 1.8vw;
  height: 1.8vw;
  @media screen and (max-width: 700px) {
    margin-right: 2vw;
    width: 2.5vw;
    height: 2.5vw;
  }
`;

const PersonalRating = styled.span``;

const PersonalPlaceIcon = styled(GrLocation)`
  margin-right: 1.5vw;
  width: 1.8vw;
  height: 1.8vw;
  @media screen and (max-width: 700px) {
    margin-right: 2vw;
    width: 2.5vw;
    height: 2.5vw;
  }
`;

const PersonalPlace = styled.span``;

const PersonalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-area: personalGrid;
  gap: 1vw;
  flex-grow: 3;
  font-size: 1.5vw;
  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
    margin-top: 2vw;
    font-size: 2.5vw;
  }
`;

const PersonalButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 8px;
  padding: 1vw;

  @media screen and (max-width: 700px) {
    flex-direction: row;
    padding: 2vw;
  }
`;

const PersonalButtonName = styled.div`
  @media screen and (max-width: 700px) {
    margin-right: 1vw;
  }
`;

const PersonalItemNumber = styled.div`
  margin-top: 0.8vw;
  @media screen and (max-width: 700px) {
    margin-top: 0;
  }
`;

const PersonalBigButton = styled.button`
  border: 1px solid black;
  border-radius: 8px;
  padding: 1vw 2vw;
  font-size: 1.5vw;
  @media screen and (max-width: 700px) {
    padding: 2vw;
    font-size: 2.5vw;
  }
`;

const PersonalCheckButton = styled(PersonalBigButton)`
  grid-area: personalCheckButton;
`;

const PersonalShareButton = styled(PersonalBigButton)`
  grid-area: personalShareButton;
`;

const SharesTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
  margin: auto 4rem;
`;

const TitleIcon = styled.img`
  width: 50px;
  padding-bottom: 0.5rem;
  margin-right: 1rem;
`;

const SharesTitle = styled.h2`
  font-size: 24px;
  @media screen and (max-width: 460px) {
    font-size: 4vw;
  }
`;

const SharesContext = styled.div`
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

const ShareCard = styled.div`
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

  @media screen and (max-width: 860px) {
    padding: 0.3rem 0.5rem;
  }

  @media screen and (max-width: 800px) {
    margin-top: 0.5rem;
  }
`;

export default SearchPage;
