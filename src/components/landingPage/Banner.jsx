import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BannerImage from '../../images/homepage/sharefood-1.jpg';
import TableImg from '../../images/homepage/table.jpg';
import TableImg2 from '../../images/homepage/table2.jpg';

const Banner = () => {
  return (
    <BannerContainer>
      <BannerContent>
        <BannerTitle>分享</BannerTitle>
        <Description>
          透過分享剩食來幫助別人，也幫助我們的環境，這裡就是你需要的交換平台，讓我們一起把「剩食」變成「勝食」吧
        </Description>
        <ButtonRow>
          <StartButton to="/login">開始使用</StartButton>
          <LearnMoreButton to="/">了解更多</LearnMoreButton>
        </ButtonRow>
      </BannerContent>
      <BannerImg src={BannerImage} />
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: no-wrap;
  position: relative;
  padding: 2rem;
  background-color: lightgray;

  @media screen and (min-width: 1520px) {
    padding: 5vw 15vw;
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 35vw;
  @media screen and (max-width: 600px) {
    max-width: 80vw;
    margin-bottom: 1rem;
  }
`;
const BannerTitle = styled.h2`
  margin-bottom: 2rem;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 60px;
  color: white;
`;

const Description = styled.p`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 24px;
  margin-bottom: 1rem;
  line-height: 2rem;
  color: black;

  @media screen and (min-width: 375px) {
    max-width: 60vw;
  }

  @media screen and (min-width: 1520px) {
    max-width: 30vw;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const StartButton = styled(Link)`
  padding: 3px;
  margin-right: 0.5rem;
  color: white;
  padding: 0.5rem;
  border-radius: 5px;
  background-color: #52b788;
`;

const LearnMoreButton = styled(Link)`
  border: 1px solid #d8f3dc;
  color: white;
  padding: 3px;
  margin-right: 0.5rem;
  padding: 0.5rem;
  border-radius: 5px;
`;

const BannerImg = styled.img`
  /* max-width: 40vw; */
  align-self: center;
  border-radius: 5px;

  @media screen and (max-width: 600px) {
    max-width: 80vw;
  }

  @media screen and (min-width: 600px) {
    max-width: 40vw;
  }

  @media screen and (min-width: 1520px) {
    max-width: 30vw;
  }
`;

export default Banner;
