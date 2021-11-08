import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { layoutConfig, themeColor } from '../../utils/commonVariables';
import { getAllContents, getSearchedContents } from '../../utils/firebase';
import Carousel from '../common/Carousel';

import RestaurantMap from './RestaurantMap';
import RestaurantSearchCard from './RestaurantSearchCard';
import Img from '../../images/restaurantPage/restaurant-8.jpg';

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
    setIsSearch(false);
    setInputValue('');
  };

  console.log(restaurants);
  return (
    <Main>
      <Banner>
        <BannerImg src={Img} />
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
            <LookButton to="/search">別人分享</LookButton>
          </ButtonRow>
        </BannerContent>
      </Banner>
      <SearchContent>
        <SearchBar
          placeholder="餐廳搜尋"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => handleOnEnter(e)}
        />
        <SearchButton onClick={() => handleSearch()}>搜尋</SearchButton>
        <ResetButton onClick={() => handleClearSearch()}>清除搜尋</ResetButton>
      </SearchContent>
      {!isSearch && restaurants ? (
        <Carousel
          title="合作餐廳"
          contentData={restaurants}
          isRestaurants={true}
        />
      ) : (
        <RestaurantSearchCard restaurant={restaurants} isRestaurants={true} />
      )}

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

  @media screen and (max-width: 600px) {
    margin: 1rem auto;
  }

  @media screen and (max-width: 450px) {
  }
`;

const SearchBar = styled.input`
  min-width: 70vw;
  border-radius: 8px;
`;

const SearchButton = styled.button`
  margin-left: 1rem;
  padding: 0.5rem 0.8rem;
  border: 1px solid black;
  border-radius: 8px;
  background-color: ${themeColor.blue};
`;

const ResetButton = styled(SearchButton)``;

const MapWrapper = styled.div`
  margin: 0 4rem 6rem;
`;

export default RestaurantPage;
