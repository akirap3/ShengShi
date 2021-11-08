import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { getSpecificContents } from '../../../utils/firebase';
import useCurrentUser from '../../../hooks/useCurrentUser';
import SharesContainer from '../../common/SharesContainer';
import MyCollectedCard from './MyCollectedCard';

const MyCollectedList = () => {
  const currentUser = useCurrentUser();
  const [savedShares, setSavedShares] = useState('');

  const getSavedShares = useCallback(
    () =>
      getSpecificContents(
        'shares',
        'savedUserId',
        'array-contains',
        'desc',
        currentUser,
        setSavedShares
      ),
    [currentUser]
  );

  useEffect(() => {
    return getSavedShares();
  }, [getSavedShares]);

  return savedShares && savedShares.length !== 0 ? (
    <SharesContainer>
      {savedShares.map((share) => (
        <MyCollectedCard key={share.id} share={share} />
      ))}
    </SharesContainer>
  ) : (
    <NoResultContainer>
      <NoResult>你沒有任何的收藏清單</NoResult>
    </NoResultContainer>
  );
};

const NoResultContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10vw;
`;

const NoResult = styled.div``;

export default MyCollectedList;
