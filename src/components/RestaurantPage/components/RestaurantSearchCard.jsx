import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { AiTwotoneHeart } from 'react-icons/ai';

import useCurrentUser from '../../../hooks/useCurrentUser';
import { handleCollection } from '../../../utils/firebase';
import NoResult from '../../common/NoResult';
import StarImg from '../../../images/common/star.png';

const RestaurantSearchCard = ({ restaurant, isRestaurants }) => {
  const currentUser = useCurrentUser();

  const handleClickHeart = (content) => {
    if (currentUser) {
      if (isRestaurants) {
        handleCollection(content, 'restaurants', currentUser);
      } else {
        handleCollection(content, 'shares', currentUser);
      }
    } else {
      return;
    }
  };

  const handleLike = (content) => {
    if (currentUser) {
      if (content?.savedUserId?.includes(currentUser.uid)) {
        return 'red';
      } else {
        return 'white';
      }
    } else {
      return 'white';
    }
  };

  return restaurant?.length !== 0 ? (
    <CarouselContainer>
      <ResultTitle>搜尋結果</ResultTitle>
      <div>
        {restaurant?.map((content) => {
          return (
            <Card key={content.id}>
              <CardImg src={content.imageUrl} alt="restaurants" />
              <CardTitle>{content.name}</CardTitle>
              <Row>
                {Array.from(Array(content.rating).keys()).map(() => (
                  <Star key={uuidv4()} src={StarImg} alt="star" />
                ))}
                <Heart
                  onClick={() => handleClickHeart(content)}
                  like={() => handleLike(content)}
                />
              </Row>
            </Card>
          );
        })}
      </div>
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
  margin-bottom: 2 rem;
  text-align: center;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 42px;
`;

const Card = styled.div`
  margin-top: 2rem;
  background-color: hsla(146, 40%, 40%, 0.4);
  border-radius: 0px 0px 10px 10px;
  border-top: 10px solid #52b788;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
`;

const CardImg = styled.img`
  width: 100%;
  min-width: 300px;
  height: 325px;
  object-fit: cover;
  border-radius: 0px 0px 0 0;

  @media screen and (min-width: 700px) {
    height: 350px;
  }

  @media screen and (min-width: 900px) {
    height: 400px;
  }
`;

const CardTitle = styled.h4`
  margin: 1rem;
  text-align: center;
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
  padding: 0 1rem 1rem;
  margin: 0 1rem;
  text-align: center;

  @media screen and (min-width: 900px) {
    margin: 0 3rem;
  }
`;

const Star = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 0.5rem;

  @media screen and (min-width: 700px) {
    width: 28px;
    height: 28px;
  }
`;

const Heart = styled(AiTwotoneHeart)`
  margin-left: auto;
  width: 24px;
  height: 24px;
  fill: ${({ like }) => like};
  cursor: pointer;

  @media screen and (min-width: 700px) {
    width: 28px;
    height: 28px;
  }
`;

export default RestaurantSearchCard;
