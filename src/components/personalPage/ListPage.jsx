import React from 'react';
import styled from 'styled-components';
import Dashbaord from './Dashboard';
import Title from './Title';
import ShareCards from './ShareCards';

import Main from '../common/Main';

const ListPage = () => {
  return (
    <Main>
      <Dashbaord />
      <Title />
      <ShareCards />
    </Main>
  );
};

export default ListPage;
