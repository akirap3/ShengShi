import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BannerImage from '../../images/homepage/sharefood-1.jpg';
import HomepageBackground from '../common/HomepageBackground';

const Banner = () => {
  return (
    <BannerContainer>
      <HomepageBackground />
      <BannerContent>
        <BannerTitle>分享</BannerTitle>
        <Description>
          透過交換平台分享剩食幫助別人與環境，一起把「剩食」變成「勝食」吧
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
  padding: 5rem 2rem;
  background: linear-gradient(to right, #4ac29a, #bdfff3);
  background: -webkit-linear-gradient(to left, #4ac29a, #bdfff3);

  @media screen and (min-width: 1500px) {
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
    margin-bottom: 3rem;
  }
`;
const BannerTitle = styled.h2`
  margin-bottom: 2rem;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 56px;
  color: black;
`;

const Description = styled.p`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 24px;
  font-weight: 100;
  margin-bottom: 2rem;
  line-height: 2rem;
  color: black;

  @media screen and (min-width: 375px) {
    max-width: 60vw;
  }

  @media screen and (min-width: 1500px) {
    max-width: 20vw;
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
  background-color: #1e88e5;
`;

const LearnMoreButton = styled(Link)`
  background-color: white;
  color: #52b788;
  padding: 3px;
  margin-right: 0.5rem;
  padding: 0.5rem;
  border-radius: 5px;
  opacity: 0.8;
`;

const BannerImg = styled.img`
  max-width: 80vw;
  align-self: center;
  border-radius: 5px;
  box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2);

  @media screen and (min-width: 600px) {
    max-width: 40vw;
  }

  @media screen and (min-width: 1500px) {
    max-width: 30vw;
  }
`;

export default Banner;
