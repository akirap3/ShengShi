import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BannerImage from '../../images/homepage/sharefood-1.jpg';

const Banner = () => {
  return (
    <BannerContainer>
      <BannerContent>
        <BannerTitle>勝食分享的好處</BannerTitle>
        <Description>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
          fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
          sequi nesciunt. Neque porro quisquam est, qui dolorem.
        </Description>
        <ButtonRow>
          <StartButton>開始使用</StartButton>
          <LearnMoreButton>了解更多</LearnMoreButton>
        </ButtonRow>
      </BannerContent>
      <BannerImg src={BannerImage} />
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  position: relative;
  background-color: #0a9396;
  padding: 2rem;
`;

const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const BannerTitle = styled.h2`
  margin-bottom: 1rem;
`;
const Description = styled.p`
  margin-bottom: 1rem;
  max-width: 300px;
  line-height: 1.4rem;
`;
const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledLink = styled(Link)`
  padding: 3px;
  margin-right: 0.5rem;
  border: 1px solid black;
  padding: 0.5rem;
  border-radius: 5px;
`;

const StartButton = styled(StyledLink)`
  background-color: #3c64b1;
`;
const LearnMoreButton = styled(StyledLink)`
  background-color: white;
`;
const BannerImg = styled.img`
  max-height: 35vh;
  align-self: center;
  border-radius: 5px;
`;

export default Banner;
