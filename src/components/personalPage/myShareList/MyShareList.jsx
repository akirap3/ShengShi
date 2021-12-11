import { useState, useEffect } from 'react';

import useCurrentUser from '../../../hooks/useCurrentUser';
import SharesContainer from '../../common/SharesContainer';
import Outer from '../../common/Outer';
import MyShareCard from './MyShareCard';
import NoResult from '../NoResult';
import Loading, { HalfHeightPaddingLoading } from '../../common/Loading';
import { getSpecificContents } from '../../../utils/firebase';

const MyShareList = () => {
  const [shares, setShares] = useState(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    return getSpecificContents(
      'shares',
      'postUser.id',
      '==',
      'desc',
      currentUser,
      setShares
    );
  }, [currentUser]);

  return (
    <>
      {shares ? (
        <>
          {shares.length !== 0 ? (
            <Outer>
              <SharesContainer>
                {shares
                  .filter((share) => share.isArchived === false)
                  .map((share) => (
                    <MyShareCard key={share.id} share={share} />
                  ))}
              </SharesContainer>
            </Outer>
          ) : (
            <NoResult text="目前沒有任何分享清單" />
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

export default MyShareList;
