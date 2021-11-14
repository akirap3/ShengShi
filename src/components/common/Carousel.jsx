import styled from 'styled-components';
import Slider from 'react-slick';
import { v4 as uuidv4 } from 'uuid';
import { handleCollection } from '../../utils/firebase';
import useCurrentUser from '../../hooks/useCurrentUser';

import { AiTwotoneHeart } from 'react-icons/ai';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import StarImg from '../../images/common/star.png';

const Carousel = ({ title, contentData, isRestaurants }) => {
  const currentUser = useCurrentUser();

  const settings = {
    className: 'slider variable-width',
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    nextArrow: <RightArrow />,
    prevArrow: <LeftArrow />,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  return (
    contentData && (
      <CarouselContainer>
        <Title>{title}</Title>
        <CarouselContext>
          <SlideWrapper>
            <StyledSlider {...settings}>
              {contentData.map((content) => {
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
                            ? content?.savedUserId?.includes(currentUser.uid)
                              ? '#FF3131'
                              : 'white'
                            : 'white'
                        }
                      />
                    </Row>
                  </Card>
                );
              })}
            </StyledSlider>
          </SlideWrapper>
        </CarouselContext>
      </CarouselContainer>
    )
  );
};

const RightArrow = ({ currentSlide, slideCount, ...props }) => {
  return <Right {...props} />;
};

const LeftArrow = ({ currentSlide, slideCount, ...props }) => {
  return <Left {...props} />;
};

const Left = styled(IoIosArrowDropleft)`
  fill: white;
`;
const Right = styled(IoIosArrowDropright)`
  fill: white;
`;

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

const CarouselContext = styled.div``;

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
    background-color: #52b788;
    padding: 5px;
    border-radius: 100px;
    width: 50px;
    height: 50px;
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
  border-radius: 0px 0px 10px 10px;
  border-top: 10px solid #52b788;
  background-color: hsla(146, 40%, 40%, 0.4);
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
`;

const CardImg = styled.img`
  width: 100%;
  height: 30vw;
  border-radius: 0px 0px 0 0;

  @media screen and (min-width: 700px) {
    height: 25vw;
  }

  @media screen and (min-width: 1120px) {
    height: 20vw;
  }
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

export default Carousel;
