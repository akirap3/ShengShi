import { useState, useEffect, useCallback } from 'react';
import useCurrentUser from '../../../hooks/useCurrentUser';
import { getSpecificContents } from '../../../utils/firebase';
import SharesContainer from '../../common/SharesContainer';
import Outer from '../../common/Outer';
import MyCollectedCard from './MyCollectedCard';
import NoResult from '../NoResult';
import Loading, { HalfHeightPaddingLoading } from '../../common/Loading';

const MyCollectedList = () => {
  const currentUser = useCurrentUser();
  const [savedShares, setSavedShares] = useState(null);

  const getSavedShares = useCallback(
    () =>
      getSpecificContents(
        'shares',
        'savedUserId',
        'array-contains',
        'desc',
        currentUser,
        setSavedShares
      ),
    [currentUser]
  );

  useEffect(() => {
    return getSavedShares();
  }, [getSavedShares]);

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
