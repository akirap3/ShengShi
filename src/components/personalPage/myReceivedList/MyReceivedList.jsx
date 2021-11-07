import React, { useCallback, useState, useEffect } from 'react';
import { getSpecificContents } from '../../../utils/firebase';
import useCurrentUser from '../../../hooks/useCurrentUser';
import MyReceivedCard from './MyRecievedCard';
import SharesContainer from '../../common/SharesContainer';

const MyReceivedList = () => {
  const currentUser = useCurrentUser();
  const [receivedShares, setReceivedShares] = useState('');

  const getReceivedShares = useCallback(
    () =>
      getSpecificContents(
        'shares',
        'receivedUserId',
        'array-contains',
        'desc',
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
          <MyReceivedCard key={share.id} share={share} />
        ))}
      </SharesContainer>
    )
  );
};

export default MyReceivedList;
