import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import MyMgmtCard from './MyMgmtCard';
import useCurrentUser from '../../../hooks/useCurrentUser';
import { getSpecificContents } from '../../../utils/firebase';

const MyMgmtList = () => {
  const [shares, setShares] = useState('');
  const currentUser = useCurrentUser();

  const getMyShares = useCallback(() => {
    getSpecificContents(
      'shares',
      'postUser.id',
      '==',
      'desc',
      currentUser,
      setShares
    );
  }, [currentUser]);

  useEffect(() => {
    return getMyShares();
  }, [getMyShares]);

  const hasContents = (shares) => {
    const sum = shares
      .map((share) => share.toReceiveUserId.length)
      .reduce((acc, current) => acc + current, 0);
    return sum ? true : false;
  };

  return (
    <>
      {shares !== '' && shares.length !== 0 ? (
        hasContents(shares) ? (
          <MgmtContainer>
            {shares.map((share) =>
              share.toReceiveUserId.map((requesterId) => {
                return (
                  <MyMgmtCard
                    key={uuidv4()}
                    share={share}
                    requesterId={requesterId}
                  />
                );
              })
            )}
          </MgmtContainer>
        ) : (
          <NoResultContainer>
            <NoResult>目前沒有任何預約</NoResult>
          </NoResultContainer>
        )
      ) : (
        <NoResultContainer>
          <NoResult>你沒有任何被預約的清單</NoResult>
        </NoResultContainer>
      )}
    </>
  );
};

const MgmtContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2vw auto;
`;

const NoResultContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10vw;
`;

const NoResult = styled.div``;

export default MyMgmtList;
