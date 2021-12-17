import { useState, useEffect } from 'react';

import useCurrentUser from '../../../hooks/useCurrentUser';
import Outer from '../../common/Outer';
import SharesContainer from '../../common/ShareCard/components/SharesContainer';
import MyToReceiveCard from './components/MyToReceiveCard';
import NoResult from '../../common/NoResult';
import Loading, { HalfHeightPaddingLoading } from '../../common/Loading';
import { getSpecificContents } from '../../../utils/firebase';

const MyToReceiveList = () => {
  const currentUser = useCurrentUser();
  const [toReceiveShares, setToReceiveShares] = useState(null);

  useEffect(() => {
    return getSpecificContents(
      'shares',
      'toReceiveUserId',
      'array-contains',
      'desc',
      currentUser,
      setToReceiveShares
    );
  }, [currentUser]);

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
