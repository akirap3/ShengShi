import React from 'react';
import styled from 'styled-components';
import { layoutConfig } from '../../utils/commonVariables';
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
  top: ${layoutConfig.navHeight};
  width: 100%;
`;

export default LandingPage;
