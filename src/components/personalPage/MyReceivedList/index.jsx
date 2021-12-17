import { useState, useEffect } from 'react';

import useCurrentUser from '../../../hooks/useCurrentUser';
import MyReceivedCard from './components/MyRecievedCard';
import SharesContainer from '../../common/ShareCard/components/SharesContainer';
import Outer from '../../common/Outer';
import NoResult from '../../common/NoResult';
import Loading, { HalfHeightPaddingLoading } from '../../common/Loading';
import { getSpecificContents } from '../../../utils/firebase';

const MyReceivedList = () => {
  const currentUser = useCurrentUser();
  const [receivedShares, setReceivedShares] = useState(null);

  useEffect(() => {
    return getSpecificContents(
      'shares',
      'receivedUserId',
      'array-contains',
      'desc',
      currentUser,
      setReceivedShares
    );
  }, [currentUser]);

  return (
    <>
      {receivedShares ? (
        <>
          {receivedShares.length !== 0 ? (
            <Outer>
              <SharesContainer>
                {receivedShares.map((share) => (
                  <MyReceivedCard key={share.id} share={share} />
                ))}
              </SharesContainer>
            </Outer>
          ) : (
            <NoResult text="你沒有任何的領取紀錄" />
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

export default MyReceivedList;
