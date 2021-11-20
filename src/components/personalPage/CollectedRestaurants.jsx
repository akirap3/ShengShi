import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { getSpecificContents } from '../../utils/firebase';
import { handleCollection } from '../../utils/firebase';
import { v4 as uuidv4 } from 'uuid';
import { AiTwotoneHeart } from 'react-icons/ai';
import StarImg from '../../images/common/star.png';

import useCurrentUser from '../../hooks/useCurrentUser';
import NoResult from './NoResult';
import Loading, { HalfHeightPaddingLoading } from '../common/Loading';

const CollectedRestaurants = () => {
  const currentUser = useCurrentUser();
  const [savedRestaurants, setSavedRestaurants] = useState(null);

  const getCollectedRestaurants = useCallback(
    () =>
      getSpecificContents(
        'restaurants',
        'savedUserId',
        'array-contains',
        'desc',
        currentUser,
        setSavedRestaurants
      ),
    [currentUser]
  );

  useEffect(() => {
    return getCollectedRestaurants();
  }, [getCollectedRestaurants]);

  return (
    <>
      {savedRestaurants ? (
        <>
          {savedRestaurants.length !== 0 ? (
            <Outer>
              <Container>
                {savedRestaurants.map((restaurant) => (
                  <Card key={restaurant.id}>
                    <CardImg src={restaurant.imageUrl} />
                    <CardTitle>{restaurant.name}</CardTitle>
                    <Row>
                      {Array.from(Array(restaurant.rating).keys()).map(() => (
                        <Star src={StarImg} key={uuidv4()} />
                      ))}
                      <Heart
                        onClick={() =>
                          handleCollection(
                            restaurant,
                            'restaurants',
                            currentUser
                          )
                        }
                      />
                    </Row>
                  </Card>
                ))}
              </Container>
            </Outer>
          ) : (
            <NoResult text="你沒有任何的收藏店家" />
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
  padding-top: 50px;
  padding-bottom: 150px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 15rem);
  gap: 15px;

  @media screen and (min-width: 700px) {
    grid-template-columns: repeat(2, 18rem);
  }
  @media screen and (min-width: 1100px) {
    grid-template-columns: repeat(3, 18rem);
  }
`;

const Card = styled.div`
  border-radius: 0px 0px 10px 10px;
  border-top: 10px solid #52b788;
  background-color: hsla(146, 40%, 40%, 0.4);
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
`;

const CardImg = styled.img`
  width: 100%;
  height: 325px;
  object-fit: cover;

  @media screen and (min-width: 700px) {
    height: 350px;
  }

  @media screen and (min-width: 900px) {
    height: 400px;
  }
`;

const CardTitle = styled.h4`
  text-align: center;
  margin-top: 15px;
  margin-bottom: 20px;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 22px;
  color: #40916c;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 50px 15px;
`;

const Star = styled.img`
  width: 14px;
  height: 14px;
  margin-right: 0.5rem;

  @media screen and (min-width: 700px) {
    width: 20px;
    height: 20px;
  }

  @media screen and (min-width: 1100px) {
    width: 24px;
    height: 24px;
  }
`;

const Heart = styled(AiTwotoneHeart)`
  margin-left: auto;
  fill: #ff3131;
  cursor: pointer;
  width: 14px;
  height: 14px;

  @media screen and (min-width: 700px) {
    width: 20px;
    height: 20px;
  }

  @media screen and (min-width: 1100px) {
    width: 24px;
    height: 24px;
  }
`;

export default CollectedRestaurants;
