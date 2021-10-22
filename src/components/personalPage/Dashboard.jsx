import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import MemberImg from '../../images/PersonalPage/user-9.jpg';

import { ImSpoonKnife } from 'react-icons/im';
import { AiTwotoneStar } from 'react-icons/ai';
import { GrLocation } from 'react-icons/gr';
import { IoMdPerson } from 'react-icons/io';
import { BsGear } from 'react-icons/bs';

const Dashbaord = () => {
  return (
    <DashboardContainer>
      <DashboardContext>
        <LeftColumn>
          <Avatar src={MemberImg} />
          <NameContext>
            <AliasIcon />
            <Alias>剩食達人</Alias>
          </NameContext>
        </LeftColumn>
        <Details>
          <Row>
            <PersoanlUsernameIcon />
            <UserName>John Chen</UserName>
            <Setting />
          </Row>
          <Row>
            <Star />
            <Rating>5</Rating>
          </Row>
          <Row>
            <PlaceIcon />
            <Place>台北 內湖</Place>
          </Row>
        </Details>
        <Grid>
          <Button as={Link} to="/personal/list">
            <ButtonName>我的清單</ButtonName>
            <ItemNumber>10</ItemNumber>
          </Button>
          <Button as={Link} to="/personal/badges">
            <ButtonName>我的勳章</ButtonName>
            <ItemNumber>3</ItemNumber>
          </Button>
          <Button as={Link} to="/personal/received">
            <ButtonName>領取紀錄</ButtonName>
            <ItemNumber>10</ItemNumber>
          </Button>
          <Button as={Link} to="/personal/toReceive">
            <ButtonName>尚未領取</ButtonName>
            <ItemNumber>10</ItemNumber>
          </Button>
          <Button as={Link} to="/personal/collectedShares">
            <ButtonName>收藏清單</ButtonName>
            <ItemNumber>10</ItemNumber>
          </Button>
          <Button as={Link} to="/personal/collectedRestaurants">
            <ButtonName>收藏店家</ButtonName>
            <ItemNumber>10</ItemNumber>
          </Button>
        </Grid>
        <CheckButton as={Link} to="/search">
          查看他人的分享
        </CheckButton>
        <ShareButton>我要分享勝食</ShareButton>
      </DashboardContext>
    </DashboardContainer>
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
  grid-template-areas: 'leftColumn personDetals personDetals  Grid Grid Grid ' 'leftColumn   personDetals personDetals  Grid Grid Grid  ' 'leftColumn  CheckButton CheckButton   ShareButton ShareButton ShareButton ';
  gap: 1vw;
  border: 1px solid black;
  border-radius: 10px;
  flex-grow: 1;
  padding: 3vw;

  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: 'leftColumn personDetals' 'Grid Grid' 'CheckButton CheckButton' 'ShareButton ShareButton';
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-area: leftColumn;
`;

const Avatar = styled.img`
  max-width: 15vw;
  border-radius: 50%;
`;

const NameContext = styled.div`
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

const Alias = styled.span`
  font-size: 1.8vw;
  @media screen and (max-width: 700px) {
    font-size: 2.5vw;
  }
`;

const Details = styled.div`
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

const Row = styled.div`
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

const UserName = styled.span`
  margin-right: 1.5vw;
`;

const Setting = styled(BsGear)`
  width: 1.8vw;
  height: 1.8vw;
  @media screen and (max-width: 700px) {
    margin-left: 2vw;
    width: 2.5vw;
    height: 2.5vw;
  }
`;

const Star = styled(AiTwotoneStar)`
  margin-right: 1.5vw;
  width: 1.8vw;
  height: 1.8vw;
  @media screen and (max-width: 700px) {
    margin-right: 2vw;
    width: 2.5vw;
    height: 2.5vw;
  }
`;

const Rating = styled.span``;

const PlaceIcon = styled(GrLocation)`
  margin-right: 1.5vw;
  width: 1.8vw;
  height: 1.8vw;
  @media screen and (max-width: 700px) {
    margin-right: 2vw;
    width: 2.5vw;
    height: 2.5vw;
  }
`;

const Place = styled.span``;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-area: Grid;
  gap: 1vw;
  flex-grow: 3;
  font-size: 1.5vw;
  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
    margin-top: 2vw;
    font-size: 2.5vw;
  }
`;

const Button = styled.div`
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

const ButtonName = styled.div`
  @media screen and (max-width: 700px) {
    margin-right: 1vw;
  }
`;

const ItemNumber = styled.div`
  margin-top: 0.8vw;
  @media screen and (max-width: 700px) {
    margin-top: 0;
  }
`;

const BigButton = styled.button`
  border: 1px solid black;
  border-radius: 8px;
  padding: 1vw 2vw;
  font-size: 1.5vw;
  text-align: center;
  @media screen and (max-width: 700px) {
    padding: 2vw;
    font-size: 2.5vw;
  }
`;

const CheckButton = styled(BigButton)`
  grid-area: CheckButton;
`;

const ShareButton = styled(BigButton)`
  grid-area: ShareButton;
`;

export default Dashbaord;
