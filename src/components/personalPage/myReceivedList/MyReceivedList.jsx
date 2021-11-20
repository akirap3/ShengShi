import React, { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { getSpecificContents } from '../../../utils/firebase';
import useCurrentUser from '../../../hooks/useCurrentUser';
import MyReceivedCard from './MyRecievedCard';
import SharesContainer from '../../common/SharesContainer';
import NoResult from '../NoResult';
import Loading, { HalfHeightPaddingLoading } from '../../common/Loading';

const MyReceivedList = () => {
  const currentUser = useCurrentUser();
  const [receivedShares, setReceivedShares] = useState(null);

  const getReceivedShares = useCallback(
    () =>
      getSpecificContents(
        'shares',
        'receivedUserId',
        'array-contains',
        'desc',
        currentUser,
        setReceivedShares
      ),
    [currentUser]
  );

  useEffect(() => {
    return getReceivedShares();
  }, [getReceivedShares]);

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

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default MyReceivedList;
