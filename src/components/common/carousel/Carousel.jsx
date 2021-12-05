import styled from 'styled-components';
import Slider from 'react-slick';
import Ripples from 'react-ripples';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { AiTwotoneHeart } from 'react-icons/ai';

import useCurrentUser from '../../../hooks/useCurrentUser';
import { handleCollection } from '../../../utils/firebase';
import { CarouselSettings } from './CarouselSettings';
import StarImg from '../../../images/common/star.png';

const Carousel = ({ title, contentData, isRestaurants }) => {
  const currentUser = useCurrentUser();
  const checkUser = useSelector((state) => state.checkUser);

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
                                      handleCollection(
                                        content,
                                        'shares',
                                        currentUser
                                      )
                                : () => {}
                            }
                            like={
                              currentUser
                                ? content?.savedUserId?.includes(
                                    currentUser.uid
                                  )
                                  ? '#FF3131'
                                  : 'white'
                                : 'white'
                            }
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

const CarouselContainer = styled.div`
  padding: 4rem 5rem;
  @media screen and (min-width: 500px) {
    padding: 4rem 10rem;
  }
`;

const Title = styled.h2`
  margin-bottom: 2rem;
  font-family: 'cwTeXYen', sans-serif;
  font-size: 36px;
  text-align: center;

  @media screen and (min-width: 500px) {
    font-size: 42px;
  }
`;

const StyledSlider = styled(Slider)``;

const SlideWrapper = styled.div`
  .slick-slider {
    @media screen and (min-width: 950px) {
      padding: 1vw 3vw;
    }
  }

  .slick-slide {
    margin-right: 8px;
    margin-left: 5px;
  }

  .slick-track {
    display: flex;
  }

  .slick-arrow {
    width: 50px;
    height: 50px;
    padding: 5px;
    border-radius: 100px;
    background-color: #52b788;
  }
  .slick-prev {
    left: -60px;

    @media screen and (min-width: 500px) {
      left: -96px;
    }

    @media screen and (min-width: 1500px) {
      left: -40px;
    }
  }
  .slick-next {
    right: -60px;

    @media screen and (min-width: 500px) {
      right: -96px;
    }

    @media screen and (min-width: 1500px) {
      right: -40px;
    }
  }
`;

const Card = styled.div`
  background-color: hsla(146, 40%, 40%, 0.4);
  border-radius: 0px 0px 10px 10px;
  border-top: 10px solid #52b788;
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
  justify-content: space-between;
  flex-wrap: nowrap;
  text-align: center;
  padding: 0 1rem 1rem;
  margin: 0 1rem;

  @media screen and (min-width: 900px) {
    margin: 0 3rem;
  }
`;

const StartContainer = styled.div`
  display: flex;
`;

const Star = styled.img`
  width: 14px;
  height: 14px;
  margin-right: 0.5rem;
  margin-top: 10px;
  margin-bottom: 10px;

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

const CarouselHeartRipples = styled(Ripples)`
  padding: 10px;
  border-radius: 50%;
`;

const Heart = styled(AiTwotoneHeart)`
  width: 14px;
  height: 14px;
  margin-left: auto;
  fill: ${(props) => props.like};
  cursor: pointer;

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

const WhiteHeart = styled(Heart)`
  margin-top: 10px;
  margin-bottom: 10px;
  fill: white;
`;

export default Carousel;
