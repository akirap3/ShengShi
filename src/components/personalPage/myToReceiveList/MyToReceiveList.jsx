import { useState, useCallback, useEffect } from 'react';
import useCurrentUser from '../../../hooks/useCurrentUser';
import { getSpecificContents } from '../../../utils/firebase';
import Outer from '../../common/Outer';
import SharesContainer from '../../common/SharesContainer';
import MyToReceiveCard from './MyToReceiveCard';
import NoResult from '../NoResult';
import Loading, { HalfHeightPaddingLoading } from '../../common/Loading';

const MyToReceiveList = () => {
  const currentUser = useCurrentUser();
  const [toReceiveShares, setToReceiveShares] = useState(null);

  const getToReceiveShares = useCallback(
    () =>
      getSpecificContents(
        'shares',
        'toReceiveUserId',
        'array-contains',
        'desc',
        currentUser,
        setToReceiveShares
      ),
    [currentUser]
  );

  useEffect(() => {
    return getToReceiveShares();
  }, [getToReceiveShares]);

  return (
    <>
      {toReceiveShares ? (
        <>
          {toReceiveShares.length !== 0 ? (
            <Outer>
              <SharesContainer>
                {toReceiveShares.map((share) => (
                  <MyToReceiveCard key={share.id} share={share} />
                ))}
              </SharesContainer>
            </Outer>
          ) : (
            <NoResult text="你沒有任何的尚未領取清單" />
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

export default MyToReceiveList;
