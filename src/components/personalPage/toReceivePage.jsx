import React from 'react';
import Dashbaord from './Dashboard';
import Title from './Title';
import ToReceive from './toReceive';

import Main from '../common/Main';

const ToReceivePage = () => {
  return (
    <Main>
      <Dashbaord />
      <Title />
      <ToReceive />
    </Main>
  );
};

export default ToReceivePage;
