import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { handleCollection } from '../../utils/firebase';
import useCurrentUser from '../../hooks/useCurrentUser';

import { AiTwotoneStar, AiTwotoneHeart } from 'react-icons/ai';

const RestaurantSearchCard = ({ restaurant, isRestaurants }) => {
  const currentUser = useCurrentUser();

  return restaurant?.length !== 0 ? (
    <CarouselContainer>
      {console.log(restaurant)}
      <CarouselContext>
        {restaurant?.map((content) => {
          return (
            <Card key={content.id}>
              <CardImg src={content.imageUrl} />
              <CardTitle>{content.name}</CardTitle>
              <Row>
                {Array.from(Array(content.rating).keys()).map(() => (
                  <Star key={uuidv4()} />
                ))}
                {console.log(content)}
                {content.postUser?.id !== currentUser?.uid ? (
                  <Heart
                    onClick={
                      currentUser
                        ? isRestaurants
                          ? () =>
                              handleCollection(
                                content,
                                'restaurants',
                                currentUser
                              )
                          : () =>
                              handleCollection(content, 'shares', currentUser)
                        : () => {}
                    }
                    like={
                      currentUser
                        ? content?.savedUserId?.includes(currentUser.uid)
                          ? 'red'
                          : 'black'
                        : 'black'
                    }
                  />
                ) : (
                  <></>
                )}
              </Row>
            </Card>
          );
        })}
      </CarouselContext>
    </CarouselContainer>
  ) : (
    <NoResultContainer>
      <NoResult>搜尋不到餐廳</NoResult>
    </NoResultContainer>
  );
};

const CarouselContainer = styled.div`
  padding: 4rem 10rem;
`;

const CarouselContext = styled.div``;

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
  margin: 1rem;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: nowrap;
  text-align: center;
  padding: 0 1rem 1rem;
  margin: 0 3rem;
`;

const Star = styled(AiTwotoneStar)``;

const Heart = styled(AiTwotoneHeart)`
  margin-left: auto;
  fill: ${(props) => props.like};
  cursor: pointer;
`;

const NoResultContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2vw 10vw 10vw 10vw;
`;

const NoResult = styled.div`
  font-size: 16px;
`;

export default RestaurantSearchCard;
