import { useEffect, useState, useCallback } from 'react';

import useCurrentUser from '../../../hooks/useCurrentUser';
import { MgmtContainer } from '../../common/mgmtCard/MgmtCardUnits';
import MyMgmtCard from './MyMgmtCard';
import NoResult from '../NoResult';
import Loading, { HalfHeightPaddingLoading } from '../../common/Loading';
import AlertPopup from '../../common/AlertPopup';
import { getSpecificContents } from '../../../utils/firebase';

const MyMgmtList = () => {
  const [shares, setShares] = useState(null);
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
      {shares ? (
        <>
          {shares.length !== 0 ? (
            hasContents(shares) ? (
              <MgmtContainer>
                {shares.map((share) =>
                  share.toReceiveUserId.map((requesterId) => {
                    return (
                      <MyMgmtCard
                        key={requesterId}
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
            <NoResult text="目前您沒有任何的分享清單，也沒有任何預約" />
          )}
        </>
      ) : (
        <HalfHeightPaddingLoading>
          <Loading />
        </HalfHeightPaddingLoading>
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
