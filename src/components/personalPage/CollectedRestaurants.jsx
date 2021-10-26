import React from 'react';
import styled from 'styled-components';

import { v4 as uuidv4 } from 'uuid';
import { AiTwotoneStar, AiTwotoneHeart } from 'react-icons/ai';

import useRestaurants from '../../hooks/useRestaurants';

const CollectedRestaurants = () => {
  const restaurants = useRestaurants();
  return (
    restaurants && (
      <Container>
        {restaurants.map((content) => {
          return (
            <Card key={content.id}>
              <CardImg src={content.imageUrl} />
              <CardTitle>{content.name}</CardTitle>
              <Row>
                {Array.from(Array(content.rating).keys()).map(() => (
                  <Star key={uuidv4()} />
                ))}
                <Heart />
              </Row>
            </Card>
          );
        })}
      </Container>
    )
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 2vw 10vw;
  gap: 1vw;

  @media screen and (max-width: 850px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 650px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 450px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Card = styled.div`
  border: 1px solid black;
  border-radius: 10px;
`;

const CardImg = styled.img`
  width: 100%;
  height: 30vw;
  border-radius: 10px 10px 0 0;

  @media screen and (min-width: 1120px) {
    height: 20vw;
  }

  @media screen and (min-width: 1024px) {
    height: 15vw;
  }

  @media screen and (min-width: 700px) {
    height: 25vw;
  }
`;

const CardTitle = styled.h4`
  text-align: center;
  margin: 1vw;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1vw;
`;

const Star = styled(AiTwotoneStar)`
  margin-right: 0.5vw;
`;

const Heart = styled(AiTwotoneHeart)`
  fill: red;
  margin-left: 1vw;
`;

export default CollectedRestaurants;
