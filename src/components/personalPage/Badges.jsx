import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { getSpecificContents } from '../../utils/firebase';
import useCurrentUser from '../../hooks/useCurrentUser';

const Badges = () => {
  const [badges, setBadges] = useState();
  const currentUser = useCurrentUser();

  const getBadges = useCallback(
    () =>
      getSpecificContents(
        'badges',
        'ownedBy',
        'array-contains',
        currentUser,
        setBadges
      ),
    [currentUser]
  );

  useEffect(() => {
    return getBadges();
  }, [getBadges]);

  return (
    <>
      {badges?.length !== 0 ? (
        badges && (
          <BadgeContainer>
            {badges.map((badge) => (
              <BadgeContext>
                <BadgeImg src={badge.imageUrl} />
                <BadgeName>{badge.name}</BadgeName>
              </BadgeContext>
            ))}
          </BadgeContainer>
        )
      ) : (
        <NoBagdeContainer>
          <NoBagde>你沒有任何的勳章</NoBagde>
        </NoBagdeContainer>
      )}
    </>
  );
};

const BadgeContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: row;
  gap: 2vw;
  padding: 3vw 10vw;

  @media screen and (max-width: 780px) {
    grid-template-columns: repeat(3, 1fr);
    padding: 3vw 15vw;
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 3vw 18vw;
  }
`;

const BadgeContext = styled.div`
  justify-self: center;
  padding: 1vw;
`;

const BadgeImg = styled.img`
  width: 15vw;
  height: 15vw;
  border: 1px solid black;
  border-radius: 50%;
  justify-items: center;

  @media screen and (max-width: 780px) {
    width: 18vw;
    height: 18vw;
  }
  @media screen and (max-width: 600px) {
    width: 25vw;
    height: 25vw;
  }
`;

const BadgeName = styled.div`
  margin-top: 1vw;
  text-align: center;
`;

const NoBagdeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10vw;
`;

const NoBagde = styled.div`
  font-size: 3vw;
`;

export default Badges;
