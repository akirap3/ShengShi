import React, { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { getSpecificContents } from '../../../utils/firebase';
import useCurrentUser from '../../../hooks/useCurrentUser';
import MyReceivedCard from './MyRecievedCard';
import SharesContainer from '../../common/SharesContainer';

const MyReceivedList = () => {
  const currentUser = useCurrentUser();
  const [receivedShares, setReceivedShares] = useState('');

  const getReceivedShares = useCallback(
    () =>
      getSpecificContents(
        'shares',
        'receivedUserId',
        'array-contains',
        'desc',
        currentUser,
        setReceivedShares
      ),
    [currentUser]
  );

  useEffect(() => {
    return getReceivedShares();
  }, [getReceivedShares]);

  return receivedShares && receivedShares.length !== 0 ? (
    <Outer>
      <SharesContainer>
        {receivedShares.map((share) => (
          <MyReceivedCard key={share.id} share={share} />
        ))}
      </SharesContainer>
    </Outer>
  ) : (
    <NoResultContainer>
      <NoResult>你沒有任何的領取紀錄</NoResult>
    </NoResultContainer>
  );
};

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoResultContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10vw;
  height: 40vh;
`;

const NoResult = styled.div`
  font-family: 'cwTeXYen', sans-serif;
  font-size: 36px;
`;

export default MyReceivedList;
