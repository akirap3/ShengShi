import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { themeColor } from '../../utils/commonVariables';
import Main from '../common/Main';

import Img from '../../images/restaurantPage/restaurant-8.jpg';
import Hotpot from '../../images/searchPage/hotpot.svg';
import { ImSpoonKnife } from 'react-icons/im';
import { AiTwotoneStar, AiTwotoneHeart } from 'react-icons/ai';
import { GrLocation } from 'react-icons/gr';

const SearchPage = () => {
  return (
    <Main>
      <Banner>
        <BannerContent>
          <Title>
            Ad eos saepe lucilius, noster postulant philosophia ea usu, qui
            dicta sadipscing te.
          </Title>
          <SubTitle>
            Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam
            no suscipit quaerendum. At nam minimum ponderum. Est audiam animal
            molestiae te. Ex duo eripuit mentitum.
          </SubTitle>
          <ButtonRow>
            <StartButton to="/login">開始使用</StartButton>
            <LookButton to="/restaurants">合作餐廳</LookButton>
          </ButtonRow>
        </BannerContent>
        <BannerImg src={Img} />
      </Banner>
      <SearchContent>
        <SearchBar placeholder="勝食搜尋" />
        <SearchButton>搜尋</SearchButton>
      </SearchContent>
      <SharesTitleContainer>
        <TitleIcon src={Hotpot} />
        <SharesTitle>目前其他人分享的勝食</SharesTitle>
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
              <GetButton>我要領取</GetButton>
            </CardRow>
          </CardContent>
        </ShareCard>
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
              <GetButton>我要領取</GetButton>
            </CardRow>
          </CardContent>
        </ShareCard>
      </SharesContext>
    </Main>
  );
};

const Banner = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 4rem;
  background-color: ${themeColor.blue};

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const BannerImg = styled.img`
  max-width: 40vw;
  border-radius: 10px;

  @media screen and (max-width: 600px) {
    order: 2;
    max-width: 80vw;
  }

  @media screen and (max-width: 450px) {
    display: none;
  }
`;

const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 35vw;
  line-height: 1.4rem;

  @media screen and (max-width: 600px) {
    order: 1;
    margin-bottom: 2rem;
    max-width: 80vw;
  }
`;

const Title = styled.h1`
  margin-bottom: 1rem;
`;

const SubTitle = styled.h3`
  margin-bottom: 1rem;
`;

const ButtonRow = styled.div`
  margin-top: 1rem;
`;

const StyledLink = styled(Link)`
  padding: 0.5rem 0.8rem;
  border: 1px solid black;
  border-radius: 10px;
`;

const StartButton = styled(StyledLink)`
  margin-right: 0.5rem;
  color: white;
  background-color: lightgray;
`;

const LookButton = styled(StyledLink)``;

const SearchContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3rem auto;

  @media screen and (max-width: 700px) {
  }

  @media screen and (max-width: 600px) {
    margin: 2rem auto;
  }
`;

const SearchBar = styled.input`
  min-width: 70vw;
  border-radius: 8px;
  @media screen and (max-width: 460px) {
    min-width: 50vw;
  }
`;

const SearchButton = styled.button`
  margin-left: 1vw;
  padding: 0.5rem 0.8rem;
  border: 1px solid black;
  border-radius: 8px;
  background-color: ${themeColor.blue};
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
