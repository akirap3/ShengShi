import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import MyMgmtCard from './MyMgmtCard';
import useCurrentUser from '../../../hooks/useCurrentUser';
import { getSpecificContents } from '../../../utils/firebase';

const MyMgmtList = () => {
  const [shares, setShares] = useState('');
  const currentUser = useCurrentUser();

  const getMyShares = useCallback(() => {
    getSpecificContents('shares', 'postUser.id', '==', currentUser, setShares);
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

  console.log(shares);
  console.log(currentUser);
  return (
    <>
      {shares !== '' && shares.length !== 0 ? (
        hasContents(shares) ? (
          <MgmtContainer>
            {shares.map((share) =>
              share.toReceiveUserId.map((requesterId) => {
                return <MyMgmtCard share={share} requesterId={requesterId} />;
              })
            )}
          </MgmtContainer>
        ) : (
          <div>目前沒有任何預約</div>
        )
      ) : (
        <div>你沒有任何的清單可預約</div>
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

export default MyMgmtList;
