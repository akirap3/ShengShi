import React from 'react';
import Dashbaord from './Dashboard';
import Title from './Title';
import Badges from './Badges';

import Main from '../common/Main';

const BadgesPage = () => {
  return (
    <Main>
      <Dashbaord />
      <Title />
      <Badges />
    </Main>
  );
};

export default BadgesPage;
