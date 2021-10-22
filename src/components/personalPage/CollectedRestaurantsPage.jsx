import React from 'react';
import Dashbaord from './Dashboard';
import Title from './Title';
import CollectedRestaurants from './CollectedRestaurants';

import Main from '../common/Main';

const CollectedRestaurantsPage = () => {
  return (
    <Main>
      <Dashbaord />
      <Title />
      <CollectedRestaurants />
    </Main>
  );
};

export default CollectedRestaurantsPage;
