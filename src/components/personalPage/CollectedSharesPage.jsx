import React from 'react';
import Dashbaord from './Dashboard';
import Title from './Title';
import CollectedShares from './CollectedShares';

import Main from '../common/Main';

const CollectedSharesPage = () => {
  return (
    <Main>
      <Dashbaord />
      <Title />
      <CollectedShares />
    </Main>
  );
};

export default CollectedSharesPage;
