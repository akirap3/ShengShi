import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { getSpecificContents } from '../../../utils/firebase';
import useCurrentUser from '../../../hooks/useCurrentUser';
import SharesContainer from '../../common/SharesContainer';
import MyShareCard from './MyShareCard';

const MyShareList = () => {
  const [shares, setShares] = useState([]);
  const currentUser = useCurrentUser();

  const getMyShareList = useCallback(
    () =>
      getSpecificContents(
        'shares',
        'postUser.id',
        '==',
        'desc',
        currentUser,
        setShares
      ),
    [currentUser]
  );

  useEffect(() => {
    return getMyShareList();
  }, [getMyShareList]);

  console.log(shares);
  return shares && shares.length !== 0 ? (
    <SharesContainer>
      {shares.map((share) => (
        <MyShareCard key={share.id} share={share} />
      ))}
    </SharesContainer>
  ) : (
    <NoResultContainer>
      <NoResult>目前沒有任何分享清單</NoResult>
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

export default MyShareList;
