import React, { useState, useEffect, useCallback } from 'react';
import { getSpecificShares } from '../../../utils/firebase';
import useCurrentUser from '../../../hooks/useCurrentUser';
import SharesContainer from '../../common/SharesContainer';
import MyShareCard from './MyShareCard';

const MyShareList = () => {
  const [shares, setShares] = useState([]);
  const currentUser = useCurrentUser();

  const getMyShareList = useCallback(
    () =>
      getSpecificShares('shares', 'postUser.id', '==', currentUser, setShares),
    [currentUser]
  );

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
