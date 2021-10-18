import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Banner from './Banner';
import Advantages from './Advantages';
import UserShares from './UserShares';
import Carousels from './Carousels';

const LandingPage = () => {
  return (
    <Main>
      <Banner />
      <Advantages />
      <UserShares />
      <Carousels />
    </Main>
  );
};

const Main = styled.div`
  position: relative;
  top: 7vh;
  width: 100%;
`;

export default LandingPage;
