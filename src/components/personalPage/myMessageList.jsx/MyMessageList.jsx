import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import MyMgmtCard from './MyMgmtCard';
import useCurrentUser from '../../../hooks/useCurrentUser';
import { getSpecificContents } from '../../../utils/firebase';

const MyMessageList = () => {
  return (
    <MgmtContainer>
      <MyMgmtCard />
    </MgmtContainer>
  );
};

const MgmtContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2vw auto;
`;

export default MyMessageList;
