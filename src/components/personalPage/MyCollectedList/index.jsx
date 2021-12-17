import { useState, useEffect } from 'react';

import useCurrentUser from '../../../hooks/useCurrentUser';
import SharesContainer from '../../common/ShareCard/components/SharesContainer';
import Outer from '../../common/Outer';
import MyCollectedCard from './components/MyCollectedCard';
import NoResult from '../../common/NoResult';
import Loading, { HalfHeightPaddingLoading } from '../../common/Loading';
import { getSpecificContents } from '../../../utils/firebase';

const MyCollectedList = () => {
  const currentUser = useCurrentUser();
  const [savedShares, setSavedShares] = useState(null);

  useEffect(() => {
    return getSpecificContents(
      'shares',
      'savedUserId',
      'array-contains',
      'desc',
      currentUser,
      setSavedShares
    );
  }, [currentUser]);

  return (
    <>
      {savedShares ? (
        <>
          {savedShares.length !== 0 ? (
            <Outer>
              <SharesContainer>
                {savedShares.map((share) => (
                  <MyCollectedCard key={share.id} share={share} />
                ))}
              </SharesContainer>
            </Outer>
          ) : (
            <NoResult text="你沒有任何的收藏清單"></NoResult>
          )}
        </>
      ) : (
        <HalfHeightPaddingLoading>
          <Loading />
        </HalfHeightPaddingLoading>
      )}
    </>
  );
};

export default MyCollectedList;
