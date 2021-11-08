import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { getSpecificContents } from '../../../utils/firebase';
import useCurrentUser from '../../../hooks/useCurrentUser';
import MyToReceiveCard from './MyToReceiveCard';
import SharesContainer from '../../common/SharesContainer';

const MyToReceiveList = () => {
  const currentUser = useCurrentUser();
  const [toReceiveShares, setToReceiveShares] = useState('');

  const getToReceiveShares = useCallback(
    () =>
      getSpecificContents(
        'shares',
        'toReceiveUserId',
        'array-contains',
        'desc',
        currentUser,
        setToReceiveShares
      ),
    [currentUser]
  );

  useEffect(() => {
    return getToReceiveShares();
  }, [getToReceiveShares]);

  return toReceiveShares && toReceiveShares.length !== 0 ? (
    <SharesContainer>
      {toReceiveShares.map((share) => (
        <MyToReceiveCard share={share} />
      ))}
    </SharesContainer>
  ) : (
    <NoResultContainer>
      <NoResult>你沒有任何的尚未領取清單</NoResult>
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

export default MyToReceiveList;
