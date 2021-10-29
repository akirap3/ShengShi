import React, { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
  orderBy,
} from '@firebase/firestore';
import useCurrentUser from '../../../hooks/useCurrentUser';
import MyShareCard from './MyShareCard';

const MyShareList = () => {
  const [shares, setShares] = useState([]);
  const currentUser = useCurrentUser();

  const getMyShareList = async () => {
    const SharesCollectionRef = collection(getFirestore(), 'shares');
    const queryDocRef = query(
      SharesCollectionRef,
      where('postUser.id', '==', currentUser.uid)
    );

    const myshares = await getDocs(queryDocRef);
    const mySharesArr = [];
    myshares.forEach((doc) => mySharesArr.push({ ...doc.data(), id: doc.id }));
    setShares(mySharesArr);
    console.log(mySharesArr);
  };

  useEffect(() => {
    getMyShareList();
  }, []);

  return <>{shares && shares.map((share) => <MyShareCard share={share} />)}</>;
};

export default MyShareList;
