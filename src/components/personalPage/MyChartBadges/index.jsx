import { useState, useEffect, useMemo } from 'react';

import styled from 'styled-components';

import useCounts from '../../../hooks/useCounts';
import { getSpecificContents } from '../../../utils/firebase';
import MyResponsivePie from './components/MyChart';
import Outer from '../../common/Outer';
import NoResult from '../../common/NoResult';
import Loading, { HalfHeightPaddingLoading } from '../../common/Loading';

const Badges = () => {
  const [badges, setBadges] = useState(null);
  const {
    myListCounts,
    myBadgeCounts,
    myReceivedCounts,
    myToReceiveCounts,
    myCollectedShareCounts,
    myCollectedStoreCounts,
    currentUser,
  } = useCounts();

  const data = useMemo(
    () => [
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
        value: myReceivedCounts || 0,
        color: 'hsl(76, 70%, 50%)',
      },
      {
        id: '尚未領取',
        label: '尚未領取',
        value: myToReceiveCounts || 0,
        color: 'hsl(279, 70%, 50%)',
      },
      {
        id: '收藏清單',
        label: '收藏清單',
        value: myCollectedShareCounts || 0,
        color: 'hsl(277, 70%, 50%)',
      },
      {
        id: '收藏店家',
        label: '收藏店家',
        value: myCollectedStoreCounts || 0,
        color: 'hsl(267, 70%, 50%)',
      },
    ],
    [
      myListCounts,
      myBadgeCounts,
      myReceivedCounts,
      myToReceiveCounts,
      myCollectedShareCounts,
      myCollectedStoreCounts,
    ]
  );

  const Total = data
    .map((record) => record.value)
    .reduce((acc, current) => acc + current);

  useEffect(() => {
    return getSpecificContents(
      'badges',
      'ownedBy',
      'array-contains',
      'asc',
      currentUser,
      setBadges
    );
  }, [currentUser]);

  return (
    <>
      {Total && (
        <ChartContainer>
          <ChartContent>
            <MyResponsivePie data={data} />
          </ChartContent>
        </ChartContainer>
      )}

      <>
        {badges ? (
          <>
            {badges?.length !== 0 ? (
              <Outer>
                <BadgeContainer>
                  {badges.map((badge) => (
                    <BadgeContext key={badge.id}>
                      <BadgeImg src={badge.imageUrl} alt="badge" />
                      <BadgeName>{badge.name}</BadgeName>
                    </BadgeContext>
                  ))}
                </BadgeContainer>
              </Outer>
            ) : (
              <NoResult text="目前沒有任何的勳章" />
            )}
          </>
        ) : (
          <HalfHeightPaddingLoading>
            <Loading />
          </HalfHeightPaddingLoading>
        )}
      </>
    </>
  );
};

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChartContent = styled.div`
  width: 100%;
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

const BadgeContext = styled.div`
  max-width: 800px;
  justify-self: center;
`;

const BadgeImg = styled.img`
  width: 25vw;
  height: 25vw;
  max-width: 180px;
  max-height: 180px;
  border-radius: 50%;
  justify-items: center;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
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
