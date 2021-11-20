import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { getSpecificContents } from '../../../utils/firebase';
import useCurrentUser from '../../../hooks/useCurrentUser';
import MyToReceiveCard from './MyToReceiveCard';
import SharesContainer from '../../common/SharesContainer';
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
                  <MyToReceiveCard share={share} />
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

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default MyToReceiveList;
