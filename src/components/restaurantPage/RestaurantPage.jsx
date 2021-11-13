import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { layoutConfig, themeColor } from '../../utils/commonVariables';
import { getAllContents, getSearchedContents } from '../../utils/firebase';
import Carousel from '../common/Carousel';
import HomepageBackground from '../common/HomepageBackground';

import RestaurantMap from './RestaurantMap';
import RestaurantSearchCard from './RestaurantSearchCard';
import Img from '../../images/restaurantPage/restaurant-8.jpg';
import TableImg from '../../images/homepage/table2.jpg';
import { IoIosSearch } from 'react-icons/io';

const RestaurantPage = () => {
  const [restaurants, setRestaurants] = useState();
  const [inputValue, setInputValue] = useState('');
  const [isSearch, setIsSearch] = useState(false);

  const getRestaurants = useCallback(() => {
    getAllContents('restaurants', setRestaurants);
  }, []);

  useEffect(() => {
    if (!isSearch) return getRestaurants();
  }, [getRestaurants, isSearch]);

  const handleSearch = () => {
    setIsSearch(true);
    getSearchedContents(
      'restaurants',
      'name',
      '==',
      inputValue,
      setRestaurants
    );
  };

  const handleOnEnter = (e) => {
    if (e.charCode === 13) handleSearch();
  };

  const handleClearSearch = () => {
    console.log('Hi');
    setIsSearch(false);
    setInputValue('');
  };

  return (
    <Main>
      <UpperPart>
        <HomepageBackground />
        <Banner>
          <BannerImg src={Img} />
          <BannerContent>
            <Title>樂於分享</Title>
            <SubTitle>
              分享快樂加倍，分享是一種生活的信念，分享是另一種幸福
            </SubTitle>
            <ButtonRow>
              <StartButton to="/login">開始使用</StartButton>
              <LookButton to="/search">別人分享</LookButton>
            </ButtonRow>
          </BannerContent>
        </Banner>
        <SearchContent>
          <SearchOutline>
            <SearchBar
              placeholder="餐廳搜尋"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => handleOnEnter(e)}
            />
            <SearchIconContainer onClick={() => handleSearch()}>
              <SearchIcon />
            </SearchIconContainer>
          </SearchOutline>
          <ResetButton onClick={() => handleClearSearch()}>
            清除搜尋
          </ResetButton>
        </SearchContent>
      </UpperPart>
      <CarouselContainer>
        {!isSearch && restaurants ? (
          <Carousel
            title="合作餐廳"
            contentData={restaurants}
            isRestaurants={true}
          />
        ) : (
          <RestaurantSearchCard restaurant={restaurants} isRestaurants={true} />
        )}
      </CarouselContainer>
      <MapWrapper>
        <RestaurantMap restaurants={restaurants} />
      </MapWrapper>
    </Main>
  );
};

const Main = styled.div`
  position: relative;
  top: ${layoutConfig.navHeight};
  width: 100%;
`;

const UpperPart = styled.div`
  position: relative;
  background: linear-gradient(90deg, #74ebd5 0%, #9face6 100%);
  padding-bottom: 2rem;
`;

const Banner = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5rem 2rem;

  @media screen and (min-width: 1500px) {
    padding: 5vw 15vw;
  }

  @media screen and (max-width: 700px) {
    flex-direction: column;
  }

  @media screen and (max-width: 450px) {
    padding: 5rem 2rem 1rem;
  }
`;

const BannerImg = styled.img`
  max-width: 80vw;
  border-radius: 5px;
  box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2);

  @media screen and (max-width: 700px) {
    order: 2;
  }

  @media screen and (min-width: 700px) {
    max-width: 40vw;
  }

  @media screen and (max-width: 450px) {
    display: none;
  }

  @media screen and (min-width: 1500px) {
    max-width: 30vw;
  }
`;

const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  max-width: 35vw;

  @media screen and (max-width: 700px) {
    order: 1;
    margin-bottom: 3rem;
    max-width: 80vw;
  }
`;

const Title = styled.h2`
  margin-bottom: 2rem;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 56px;
  color: black;
`;

const SubTitle = styled.h3`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 24px;
  font-weight: 100;
  margin-bottom: 2rem;
  line-height: 2rem;
  color: #0000009e;

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

const StyledLink = styled(Link)`
  margin-right: 0.5rem;
  padding: 0.5rem;
  border-radius: 5px;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 24px;
`;

const StartButton = styled(StyledLink)`
  color: white;
  background-color: #1e88e5;
`;

const LookButton = styled(StyledLink)`
  background-color: white;
  color: rgb(147, 188, 225);
  opacity: 0.8;
`;

const SearchContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px auto;
  padding: 0 0 3rem 0;

  @media screen and (max-width: 600px) {
    margin: 1rem auto;
  }

  @media screen and (max-width: 520px) {
    flex-direction: column;
  }

  @media screen and (min-width: 1500px) {
  }
`;

const SearchOutline = styled.div`
  position: relative;
  background: #b7e4c7;
  height: 60px;
  border-radius: 40px;
  padding: 10px;
  color: white;
  margin-right: 1rem;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
  backdrop-filter: blur(5px);

  &:hover > input {
    color: #40916c;
    width: 240px;
    padding: 0 6px;
  }

  &:hover > span {
    background: white;
  }
`;

const SearchBar = styled.input`
  font-family: 'cwTeXYen', sans-serif;
  border: none;
  background: none;
  outline: none;
  float: left;
  padding: 0;
  font-size: 24px;
  transition: 0.4s;
  line-height: 40px;
  width: 0px;
`;

const SearchIconContainer = styled.span`
  float: right;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #b7e4c7;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  transition: 0.4;
`;

const SearchIcon = styled(IoIosSearch)`
  fill: #1b4332;
  width: 20px;
  height: 20px;
`;

const ResetButton = styled.button`
  position: relative;
  padding: 0.5rem;
  height: 60px;
  border-radius: 20px;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 24px;
  border: 1px solid #a0a0968a;
  color: white;
  box-shadow: 0px 2px 6px 0px hsla(0, 0%, 0%, 0.2);
  backdrop-filter: blur(5px);

  @media screen and (max-width: 520px) {
    margin-top: 1rem;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  background: rgb(255, 243, 247);
`;

const MapWrapper = styled.div`
  padding-bottom: 100px;
`;

export default RestaurantPage;
