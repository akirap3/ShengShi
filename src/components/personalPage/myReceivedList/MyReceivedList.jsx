import React, { useCallback, useState, useEffect } from 'react';
import { getSpecificShares } from '../../../utils/firebase';
import useCurrentUser from '../../../hooks/useCurrentUser';
import MyReceivedCard from './MyRecievedCard';
import SharesContainer from '../../common/SharesContainer';

const MyReceivedList = () => {
  const currentUser = useCurrentUser();
  const [receivedShares, setReceivedShares] = useState('');

  const getReceivedShares = useCallback(
    () =>
      getSpecificShares(
        'shares',
        'receivedUserId',
        'array-contains',
        currentUser,
        setReceivedShares
      ),
    [currentUser]
  );

  useEffect(() => {
    return getReceivedShares();
  }, [getReceivedShares]);

  return (
    receivedShares && (
      <SharesContainer>
        {receivedShares.map((share) => (
          <MyReceivedCard share={share} />
        ))}
      </SharesContainer>
    )
  );
};

export default MyReceivedList;
