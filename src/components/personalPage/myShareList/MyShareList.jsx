import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { getSpecificContents } from '../../../utils/firebase';
import useCurrentUser from '../../../hooks/useCurrentUser';
import SharesContainer from '../../common/SharesContainer';
import MyShareCard from './MyShareCard';
import NoResult from '../NoResult';

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
    <NoResult text="目前沒有任何分享清單"></NoResult>
  );
};

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default MyShareList;
