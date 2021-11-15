import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { handleCollection } from '../../utils/firebase';
import useCurrentUser from '../../hooks/useCurrentUser';
import NoResult from '../personalPage/NoResult';

import { AiTwotoneHeart } from 'react-icons/ai';
import StarImg from '../../images/common/star.png';

const RestaurantSearchCard = ({ restaurant, isRestaurants }) => {
  const currentUser = useCurrentUser();

  return restaurant?.length !== 0 ? (
    <CarouselContainer>
      <ResultTitle>搜尋結果</ResultTitle>
      <CarouselContext>
        {restaurant?.map((content) => {
          return (
            <Card key={content.id}>
              <CardImg src={content.imageUrl} />
              <CardTitle>{content.name}</CardTitle>
              <Row>
                {Array.from(Array(content.rating).keys()).map(() => (
                  <Star key={uuidv4()} src={StarImg} />
                ))}
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
                        : () => handleCollection(content, 'shares', currentUser)
                      : () => {}
                  }
                  like={
                    currentUser
                      ? content?.savedUserId?.includes(currentUser.uid)
                        ? 'red'
                        : 'white'
                      : 'white'
                  }
                />
              </Row>
            </Card>
          );
        })}
      </CarouselContext>
    </CarouselContainer>
  ) : (
    <NoResult text="搜尋不到餐廳" />
  );
};

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5rem;
`;

const ResultTitle = styled.div`
  font-size: 42px;
  margin-bottom: 2 rem;
  font-family: 'cwTeXYen', sans-serif;
  text-align: center;
`;

const CarouselContext = styled.div`
  width: 40vw;
`;

const Card = styled.div`
  border-radius: 0px 0px 10px 10px;
  border-top: 10px solid #52b788;
  background-color: hsla(146, 40%, 40%, 0.4);
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  margin-top: 2rem;
`;

const CardImg = styled.img`
  width: 100%;
  height: 30vw;
  border-radius: 0px 0px 0 0;
`;

const CardTitle = styled.h4`
  text-align: center;
  margin: 1rem;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 22px;
  color: #40916c;

  @media screen and (min-width: 1500px) {
    font-size: 36px;
  }
`;

const Row = styled.div`
  display: flex;
  flex-wrap: nowrap;
  text-align: center;
  padding: 0 1rem 1rem;
  margin: 0 1rem;

  @media screen and (min-width: 900px) {
    margin: 0 3rem;
  }
`;

const Star = styled.img`
  width: 14px;
  height: 14px;
  margin-right: 0.5rem;

  @media screen and (min-width: 700px) {
    width: 16px;
    height: 16px;
  }

  @media screen and (min-width: 800px) {
    width: 20px;
    height: 20px;
  }

  @media screen and (min-width: 1100px) {
    width: 28px;
    height: 28px;
  }
`;

const Heart = styled(AiTwotoneHeart)`
  margin-left: auto;
  fill: ${(props) => props.like};
  cursor: pointer;
  width: 14px;
  height: 14px;

  @media screen and (min-width: 700px) {
    width: 16px;
    height: 16px;
  }

  @media screen and (min-width: 800px) {
    width: 20px;
    height: 20px;
  }

  @media screen and (min-width: 1100px) {
    width: 28px;
    height: 28px;
  }
`;

export default RestaurantSearchCard;
