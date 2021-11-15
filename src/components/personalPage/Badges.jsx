import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import {
  getSpecificContents,
  getCountsTwoFiltered,
  getContentCounts,
} from '../../utils/firebase';
import useCurrentUser from '../../hooks/useCurrentUser';
import MyResponsivePie from './MyChart';
import NoResult from './NoResult';

const Badges = () => {
  const [badges, setBadges] = useState();
  const [myListCounts, setMyListCounts] = useState(0);
  const [myBadgeCounts, setMyBadgeCounts] = useState(0);
  const [myReceivedCounts, setMyReceivedCounts] = useState(0);
  const [myToReceiveCounts, setMyToReceiveCounts] = useState(0);
  const [myCollectedShareCounts, setMyCollectedShareCounts] = useState(0);
  const [myCollectedStoreCounts, setMyCollectedStoreCounts] = useState(0);
  const currentUser = useCurrentUser();

  const data = [
    {
      id: '我的清單',
      label: '我的清單',
      value: myListCounts || 0,
      color: 'hsl(187, 70%, 50%)',
    },
    {
      id: '我的勳章',
      label: '我的勳章',
      value: myBadgeCounts || 0,
      color: 'hsl(65, 70%, 50%)',
    },
    {
      id: '領取紀錄',
      label: '領取紀錄',
      value: myReceivedCounts || 8,
      color: 'hsl(76, 70%, 50%)',
    },
    {
      id: '尚未領取',
      label: '尚未領取',
      value: myToReceiveCounts || 6,
      color: 'hsl(279, 70%, 50%)',
    },
    {
      id: '收藏清單',
      label: '收藏清單',
      value: myCollectedShareCounts || 6,
      color: 'hsl(277, 70%, 50%)',
    },
    {
      id: '收藏店家',
      label: '收藏店家',
      value: myCollectedStoreCounts || 3,
      color: 'hsl(267, 70%, 50%)',
    },
  ];

  const getBadges = useCallback(
    () =>
      getSpecificContents(
        'badges',
        'ownedBy',
        'array-contains',
        'asc',
        currentUser,
        setBadges
      ),
    [currentUser]
  );

  const getMyListCounts = useCallback(
    () =>
      getCountsTwoFiltered(
        'shares',
        'postUser.id',
        'isArchived',
        '==',
        '==',
        currentUser,
        false,
        setMyListCounts
      ),
    [currentUser]
  );

  const getBadgeCounts = useCallback(
    () =>
      getContentCounts(
        'badges',
        'ownedBy',
        'array-contains',
        currentUser,
        setMyBadgeCounts
      ),
    [currentUser]
  );

  const getReceivedCounts = useCallback(
    () =>
      getContentCounts(
        'shares',
        'receivedUserId',
        'array-contains',
        currentUser,
        setMyReceivedCounts
      ),
    [currentUser]
  );

  const getToReceiveCounts = useCallback(
    () =>
      getContentCounts(
        'shares',
        'toReceiveUserId',
        'array-contains',
        currentUser,
        setMyToReceiveCounts
      ),
    [currentUser]
  );

  const getCollectedShareCounts = useCallback(
    () =>
      getContentCounts(
        'shares',
        'savedUserId',
        'array-contains',
        currentUser,
        setMyCollectedShareCounts
      ),
    [currentUser]
  );

  const getCollectedStoreCounts = useCallback(
    () =>
      getContentCounts(
        'restaurants',
        'savedUserId',
        'array-contains',
        currentUser,
        setMyCollectedStoreCounts
      ),
    [currentUser]
  );

  useEffect(() => {
    return getBadges();
  }, [getBadges]);

  useEffect(() => {
    return getMyListCounts();
  }, [getMyListCounts]);

  useEffect(() => {
    return getBadgeCounts();
  }, [getBadgeCounts]);

  useEffect(() => {
    return getReceivedCounts();
  }, [getReceivedCounts]);

  useEffect(() => {
    return getToReceiveCounts();
  }, [getToReceiveCounts]);

  useEffect(() => {
    return getCollectedShareCounts();
  }, [getCollectedShareCounts]);

  useEffect(() => {
    return getCollectedStoreCounts();
  }, [getCollectedStoreCounts]);

  return (
    <>
      <CharContainer>
        <ChartContent>
          <MyResponsivePie data={data} />
        </ChartContent>
      </CharContainer>
      {badges?.length !== 0 ? (
        badges && (
          <Outer>
            <BadgeContainer>
              {badges.map((badge) => (
                <BadgeContext key={badge.id}>
                  <BadgeImg src={badge.imageUrl} />
                  <BadgeName>{badge.name}</BadgeName>
                </BadgeContext>
              ))}
            </BadgeContainer>
          </Outer>
        )
      ) : (
        <NoResult text="目前沒有任何的勳章" />
      )}
    </>
  );
};

const CharContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChartContent = styled.div`
  width: 600px;
  height: 600px;
  @media screen and (max-width: 900px) {
    width: 80vw;
    height: 60vw;
  }
  @media screen and (max-width: 650px) {
    width: 80vw;
    height: 70vw;
  }
`;

const BadgeContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: row;
  gap: 2vw;
  padding-bottom: 100px;

  @media screen and (min-width: 650px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BadgeContext = styled.div`
  justify-self: center;
  max-width: 800px;
`;

const BadgeImg = styled.img`
  width: 25vw;
  height: 25vw;
  max-width: 180px;
  max-height: 180px;
  border-radius: 50%;
  justify-items: center;
`;

const BadgeName = styled.div`
  margin-top: 15px;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 18px;
  text-align: center;

  @media screen and (min-width: 650px) {
    font-size: 24px;
  }
`;

export default Badges;
