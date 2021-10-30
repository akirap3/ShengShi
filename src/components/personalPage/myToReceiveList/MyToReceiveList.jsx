import React, { useState, useCallback, useEffect } from 'react';
import {
  getFirestore,
  query,
  where,
  onSnapshot,
  collection,
} from '@firebase/firestore';

import useCurrentUser from '../../../hooks/useCurrentUser';
import MyToReceiveCard from './MyToReceiveCard';
import SharesContainer from '../../common/SharesContainer';

const MyToReceiveList = () => {
  const currentUser = useCurrentUser();
  const [toReceiveShares, setToReceiveShares] = useState('');

  const getToReceiveShares = useCallback(() => {
    const q = query(
      collection(getFirestore(), 'shares'),
      where('toReceiveUserId', 'array-contains', currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const toReceivedShares = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setToReceiveShares(toReceivedShares);
      console.log(toReceiveShares);
    });

    return unsubscribe;
  }, [currentUser.uid]);

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
