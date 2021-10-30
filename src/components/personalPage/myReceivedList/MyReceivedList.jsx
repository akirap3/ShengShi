import React, { useCallback, useState, useEffect } from 'react';
import {
  getFirestore,
  query,
  where,
  onSnapshot,
  collection,
} from '@firebase/firestore';

import useCurrentUser from '../../../hooks/useCurrentUser';
import MyReceivedCard from './MyRecievedCard';
import SharesContainer from '../../common/SharesContainer';

const MyReceivedList = () => {
  const currentUser = useCurrentUser();
  const [receivedShares, setReceivedShares] = useState('');

  const getReceivedShares = useCallback(() => {
    const q = query(
      collection(getFirestore(), 'shares'),
      where('receivedUserId', 'array-contains', currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const receivedShares = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setReceivedShares(receivedShares);
    });

    return unsubscribe;
  }, [currentUser.uid]);

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
