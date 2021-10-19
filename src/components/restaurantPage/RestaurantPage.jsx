import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { layoutConfig } from '../../utils/commonVariables';
import Carousels from '../landingPage/Carousels';

const RestaurantPage = () => {
  return (
    <Main>
      <Banner>
        <BannerImg />
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
            <StartButton>開始使用</StartButton>
            <LookButton>別人分享</LookButton>
          </ButtonRow>
        </BannerContent>
      </Banner>
      <SearchContent>
        <SearchBar placeholder="餐廳搜尋" />
        <SearchButton>搜尋</SearchButton>
      </SearchContent>
      <Carousels />
      <Map />
    </Main>
  );
};

const Main = styled.div`
  position: relative;
  top: ${layoutConfig.navHeight};
  width: 100%;
`;

const Banner = styled.div``;

const BannerImg = styled.img``;

const BannerContent = styled.div``;

const Title = styled.h1``;

const SubTitle = styled.h3``;

const ButtonRow = styled.div``;

const StartButton = styled(Link)``;

const LookButton = styled(Link)``;

const SearchContent = styled.div``;

const SearchBar = styled.input``;

const SearchButton = styled.button``;

const Map = styled.div``;

export default RestaurantPage;
