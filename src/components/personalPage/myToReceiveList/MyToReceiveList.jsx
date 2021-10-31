import React, { useState, useCallback, useEffect } from 'react';
import { getSpecificShares } from '../../../utils/firebase';
import useCurrentUser from '../../../hooks/useCurrentUser';
import MyToReceiveCard from './MyToReceiveCard';
import SharesContainer from '../../common/SharesContainer';

const MyToReceiveList = () => {
  const currentUser = useCurrentUser();
  const [toReceiveShares, setToReceiveShares] = useState('');

  const getToReceiveShares = useCallback(
    () =>
      getSpecificShares(
        'shares',
        'toReceiveUserId',
        'array-contains',
        currentUser,
        setToReceiveShares
      ),
    [currentUser]
  );

  useEffect(() => {
    return getToReceiveShares();
  }, [getToReceiveShares]);

  return (
    toReceiveShares && (
      <SharesContainer>
        {toReceiveShares.map((share) => (
          <MyToReceiveCard share={share} />
        ))}
      </SharesContainer>
    )
  );
};

export default MyToReceiveList;
