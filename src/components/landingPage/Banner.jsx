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
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
          fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
          sequi nesciunt. Neque porro quisquam est, qui dolorem.
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
  flex-wrap: wrap;
  position: relative;
  padding: 2rem;

  @media screen and (min-width: 1920px) {
    padding: 0 20vw;
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
  margin-bottom: 1rem;
  font-size: 60px;
  color: white;
`;
const Description = styled.p`
  margin-bottom: 1rem;
  line-height: 1.4rem;
  color: white;
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
  max-width: 40vw;
  align-self: center;
  border-radius: 5px;

  @media screen and (min-width: 1920px) {
    max-width: 20vw;
    margin: 3vw auto;
  }

  @media screen and (max-width: 600px) {
    max-width: 80vw;
  }
`;

export default Banner;
