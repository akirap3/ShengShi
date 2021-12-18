import { useState, useEffect } from 'react';

import useCurrentUser from './useCurrentUser';
import { getContentCounts, getCountsTwoFiltered } from '../utils/firebase';

const useCounts = () => {
  const currentUser = useCurrentUser();
  const [myListCounts, setMyListCounts] = useState(0);
  const [myBadgeCounts, setMyBadgeCounts] = useState(0);
  const [myReceivedCounts, setMyReceivedCounts] = useState(0);
  const [myToReceiveCounts, setMyToReceiveCounts] = useState(0);
  const [myCollectedShareCounts, setMyCollectedShareCounts] = useState(0);
  const [myCollectedStoreCounts, setMyCollectedStoreCounts] = useState(0);

  useEffect(() => {
    return getCountsTwoFiltered(
      'shares',
      'postUser.id',
      'isArchived',
      '==',
      '==',
      currentUser,
      false,
      setMyListCounts
    );
  }, [currentUser]);

  useEffect(() => {
    return getContentCounts(
      'badges',
      'ownedBy',
      'array-contains',
      currentUser,
      setMyBadgeCounts
    );
  }, [currentUser]);

  useEffect(() => {
    return getContentCounts(
      'shares',
      'receivedUserId',
      'array-contains',
      currentUser,
      setMyReceivedCounts
    );
  }, [currentUser]);

  useEffect(() => {
    return getContentCounts(
      'shares',
      'toReceiveUserId',
      'array-contains',
      currentUser,
      setMyToReceiveCounts
    );
  }, [currentUser]);

  useEffect(() => {
    return getContentCounts(
      'shares',
      'savedUserId',
      'array-contains',
      currentUser,
      setMyCollectedShareCounts
    );
  }, [currentUser]);

  useEffect(() => {
    return getContentCounts(
      'restaurants',
      'savedUserId',
      'array-contains',
      currentUser,
      setMyCollectedStoreCounts
    );
  }, [currentUser]);

  return {
    myListCounts,
    myBadgeCounts,
    myReceivedCounts,
    myToReceiveCounts,
    myCollectedShareCounts,
    myCollectedStoreCounts,
    currentUser,
  };
};

export default useCounts;
