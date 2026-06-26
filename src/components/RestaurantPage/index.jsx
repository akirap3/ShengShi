import { useState, useEffect } from 'react';

import styled from 'styled-components';

import { layoutConfig } from '../../utils/commonVariables';
import { getAllContents, getSearchedContents } from '../../utils/firebase';
import { useTranslation } from '../../context/LanguageContext';
import Carousel from '../common/carousel/Carousel';
import Background from '../common/Background';
import Loading, { HalfHeightPaddingLoading } from '../common/Loading';
import {
  BannerContent,
  BannerTitle,
  Subtitle,
  ButtonRow,
  StartButton,
  LearnMoreButton,
} from '../common/banner/CommonBanner';
import {
  SearchContent,
  SearchOutline,
  SearchBar,
  SearchIconContainer,
  SearchIcon,
  ResetButton,
  StyledRipples,
} from '../common/search/SearchUnits';
import RestaurantMap from './components/RestaurantMap';
import RestaurantSearchCard from './components/RestaurantSearchCard';
import Img from '../../images/restaurantPage/restaurant-8.jpg';

const RestaurantPage = () => {
  const [restaurants, setRestaurants] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!isSearch) return getAllContents('restaurants', setRestaurants);
  }, [isSearch]);

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

  return (
    <Main>
      <UpperPart>
        <Background circleBgColor={'rgba(255, 255, 255, 0.2)'} />
        <Banner>
          <BannerImg src={Img} alt="share-redundant-food" />
          <StyledBannerContent>
            <BannerTitle>{t('happyToShare')}</BannerTitle>
            <Subtitle>
              {t('restaurantSubtitle')}
            </Subtitle>
            <ButtonRow>
              <StartButton to="/login">{t('startUsing')}</StartButton>
              <LearnMoreButton to="/search">{t('exploreShares')}</LearnMoreButton>
            </ButtonRow>
          </StyledBannerContent>
        </Banner>
        <SearchContent>
          <SearchOutline>
            <SearchBar
              placeholder={t('searchPartners')}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleOnEnter}
            />
            <SearchIconContainer onClick={() => handleSearch()}>
              <SearchIcon />
            </SearchIconContainer>
          </SearchOutline>
          <StyledRipples during={3000}>
            <StyledResetButton onClick={() => handleClearSearch()}>
              {t('clearSearch')}
            </StyledResetButton>
          </StyledRipples>
        </SearchContent>
      </UpperPart>
      {restaurants ? (
        <>
          <CarouselContainer>
            {!isSearch ? (
              <Carousel
                title="合作餐廳"
                contentData={restaurants}
                isRestaurants={true}
              />
            ) : (
              <RestaurantSearchCard
                restaurant={restaurants}
                isRestaurants={true}
              />
            )}
          </CarouselContainer>
          <MapWrapper>
            <RestaurantMap restaurants={restaurants} />
          </MapWrapper>
        </>
      ) : (
        <HalfHeightPaddingLoading>
          <Loading />
        </HalfHeightPaddingLoading>
      )}
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

const StyledBannerContent = styled(BannerContent)`
  @media screen and (max-width: 700px) {
    order: 1;
    margin-bottom: 3rem;
    max-width: 80vw;
  }
`;

const StyledResetButton = styled(ResetButton)`
  color: white;
`;

const CarouselContainer = styled.div`
  position: relative;
  background: rgb(255, 243, 247);
`;

const MapWrapper = styled.div`
  padding-bottom: 100px;
`;

export default RestaurantPage;
