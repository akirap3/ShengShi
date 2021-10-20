import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { themeColor } from '../../utils/commonVariables';
import Main from '../common/Main';

import Img from '../../images/restaurantPage/restaurant-8.jpg';

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

export default SearchPage;
