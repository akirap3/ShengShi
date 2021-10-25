import React from 'react';
import styled from 'styled-components';
import BadgeTemplateImg from '../../images/badgePage/badge-2.png';

const Badges = () => {
  return (
    <BadgeContainer>
      {Array(9)
        .fill(0)
        .map(() => (
          <BadgeContext>
            <BadgeImg src={BadgeTemplateImg} />
            <BadgeName>勳章 x</BadgeName>
          </BadgeContext>
        ))}
    </BadgeContainer>
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

export default Badges;
