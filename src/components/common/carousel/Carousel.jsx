import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';

import useCurrentUser from '../../../hooks/useCurrentUser';
import { handleCollection } from '../../../utils/firebase';
import { CarouselSettings } from './CarouselSettings';
import StarImg from '../../../images/common/star.png';

import {
  CarouselContainer,
  Title,
  StyledSlider,
  SlideWrapper,
  Card,
  CardImg,
  CardTitle,
  Row,
  StartContainer,
  Star,
  CarouselHeartRipples,
  Heart,
  WhiteHeart,
} from './style/Carousel.style';

const Carousel = ({ title, contentData, isRestaurants }) => {
  const currentUser = useCurrentUser();
  const checkUser = useSelector((state) => state.checkUser);

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
        return '#FF3131';
      } else {
        return 'white';
      }
    } else {
      return 'white';
    }
  };

  return (
    contentData && (
      <CarouselContainer>
        <Title>{title}</Title>
        <div>
          <SlideWrapper>
            <StyledSlider {...CarouselSettings}>
              {contentData.map((content) => {
                return (
                  <Card key={content.id}>
                    <CardImg src={content.imageUrl} alt="redundant-food" />
                    <CardTitle>{content.name}</CardTitle>
                    <Row>
                      <StartContainer>
                        {Array.from(Array(content.rating).keys()).map(() => (
                          <Star key={uuidv4()} src={StarImg} alt="star" />
                        ))}
                      </StartContainer>
                      {!checkUser.isLoggedIn ? (
                        <WhiteHeart />
                      ) : (
                        <CarouselHeartRipples color="#ff4d6d" during={1000}>
                          <Heart
                            onClick={() => handleClickHeart(content)}
                            like={() => handleLike(content)}
                          />
                        </CarouselHeartRipples>
                      )}
                    </Row>
                  </Card>
                );
              })}
            </StyledSlider>
          </SlideWrapper>
        </div>
      </CarouselContainer>
    )
  );
};

export default Carousel;
