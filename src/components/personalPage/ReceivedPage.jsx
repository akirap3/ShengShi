import React from 'react';
import Dashbaord from './Dashboard';
import Title from './Title';
import Received from './Received';

import Main from '../common/Main';

const ReceivedPage = () => {
  return (
    <Main>
      <Dashbaord />
      <Title />
      <Received />
    </Main>
  );
};

export default ReceivedPage;
