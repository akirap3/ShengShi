import React, { useState, useEffect, useCallback } from 'react';

import { getSpecificShares } from '../../../utils/firebase';
import useCurrentUser from '../../../hooks/useCurrentUser';
import SharesContainer from '../../common/SharesContainer';
import MyCollectedCard from './MyCollectedCard';

const MyCollectedList = () => {
  const currentUser = useCurrentUser();
  const [savedShares, setSavedShares] = useState('');

  const getSavedShares = useCallback(
    () =>
      getSpecificShares(
        'shares',
        'savedUserId',
        'array-contains',
        currentUser,
        setSavedShares
      ),
    [currentUser]
  );

  useEffect(() => {
    return getSavedShares();
  }, [getSavedShares]);

  return (
    savedShares && (
      <SharesContainer>
        {savedShares.map((share) => (
          <MyCollectedCard key={share.id} share={share} />
        ))}
      </SharesContainer>
    )
  );
};

export default MyCollectedList;
