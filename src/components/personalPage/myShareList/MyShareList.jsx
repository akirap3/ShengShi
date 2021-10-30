import React, { useState, useEffect, useCallback } from 'react';
import {
  collection,
  getFirestore,
  query,
  where,
  onSnapshot,
} from '@firebase/firestore';
import useCurrentUser from '../../../hooks/useCurrentUser';
import SharesContainer from '../../common/SharesContainer';
import MyShareCard from './MyShareCard';

const MyShareList = () => {
  const [shares, setShares] = useState([]);
  const currentUser = useCurrentUser();

  const getMyShareList = useCallback(() => {
    const q = query(
      collection(getFirestore(), 'shares'),
      where('postUser.id', '==', currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const myShares = [];
      querySnapshot.forEach((doc) =>
        myShares.push({ ...doc.data(), id: doc.id })
      );
      setShares(myShares);
      console.log(myShares);
    });

    return unsubscribe;
  }, [currentUser.uid]);

  useEffect(() => {
    return getMyShareList();
  }, [getMyShareList]);

  return (
    shares && (
      <SharesContainer>
        {shares.map((share) => (
          <MyShareCard share={share} />
        ))}
      </SharesContainer>
    )
  );
};

export default MyShareList;
