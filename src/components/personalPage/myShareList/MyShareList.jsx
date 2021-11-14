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

  return shares && shares.length !== 0 ? (
    <Outer>
      <SharesContainer>
        {shares
          .filter((share) => share.isArchived === false)
          .map((share) => (
            <MyShareCard key={share.id} share={share} />
          ))}
      </SharesContainer>
    </Outer>
  ) : (
    <NoResultContainer>
      <NoResult>目前沒有任何分享清單</NoResult>
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

export default MyShareList;
