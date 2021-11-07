import React, { useState, useEffect, useCallback } from 'react';
import { getSpecificContents } from '../../../utils/firebase';
import useCurrentUser from '../../../hooks/useCurrentUser';
import SharesContainer from '../../common/SharesContainer';
import MyShareCard from './MyShareCard';

const MyShareList = () => {
  const [shares, setShares] = useState([]);
  const currentUser = useCurrentUser();

  const getMyShareList = useCallback(
    () =>
      getSpecificContents(
        'shares',
        'postUser.id',
        '==',
        'desc',
        currentUser,
        setShares
      ),
    [currentUser]
  );

  useEffect(() => {
    return getMyShareList();
  }, [getMyShareList]);

  return (
    shares && (
      <SharesContainer>
        {shares.map((share) => (
          <MyShareCard key={share.id} share={share} />
        ))}
      </SharesContainer>
    )
  );
};

export default MyShareList;
