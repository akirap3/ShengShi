import React, { useState, useEffect, useCallback } from 'react';

import {
  getFirestore,
  query,
  where,
  onSnapshot,
  collection,
} from '@firebase/firestore';

import useCurrentUser from '../../../hooks/useCurrentUser';
import SharesContainer from '../../common/SharesContainer';
import MyCollectedCard from './MyCollectedCard';

const MyCollectedList = () => {
  const currentUser = useCurrentUser();
  const [savedShares, setSavedShares] = useState('');

  const getSavedShares = useCallback(() => {
    const q = query(
      collection(getFirestore(), 'shares'),
      where('savedUserId', 'array-contains', currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const savedShares = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setSavedShares(savedShares);
    });

    return unsubscribe;
  }, [currentUser.uid]);

  useEffect(() => {
    return getSavedShares();
  }, [getSavedShares]);

  return (
    savedShares && (
      <SharesContainer>
        {savedShares.map((share) => (
          <MyCollectedCard share={share} />
        ))}
      </SharesContainer>
    )
  );
};

export default MyCollectedList;
