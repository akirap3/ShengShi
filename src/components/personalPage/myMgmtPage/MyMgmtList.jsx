import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { MgmtContainer } from '../../common/mgmtCard/MgmtCardUnits';
import MyMgmtCard from './MyMgmtCard';
import useCurrentUser from '../../../hooks/useCurrentUser';
import { getSpecificContents } from '../../../utils/firebase';
import NoResult from '../NoResult';
import AlertPopup from '../../common/AlertPopup';

const MyMgmtList = () => {
  const [shares, setShares] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const currentUser = useCurrentUser();

  const openInfo = () => setShowInfo(true);
  const closeInfo = () => setShowInfo(false);

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
                    setAlertMessage={setAlertMessage}
                    openInfo={openInfo}
                  />
                );
              })
            )}
          </MgmtContainer>
        ) : (
          <NoResult text="目前沒有任何預約" />
        )
      ) : (
        <NoResult text="目前沒有任何預約" />
      )}
      <AlertPopup
        showInfo={showInfo}
        closeInfo={closeInfo}
        message={alertMessage}
      />
    </>
  );
};

export default MyMgmtList;
